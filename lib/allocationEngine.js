import Provider from "../models/Provider"
import LeadAssignment from "../models/LeadAssignment"
import AllocationState from "../models/AllocationState"

const mandatoryProviders = {

    "Service 1": ["Provider 1"],

    "Service 2": ["Provider 5"],

    "Service 3": ["Provider 1", "Provider 4"]

}

const providerPools = {

    "Service 1": [
        "Provider 2",
        "Provider 3",
        "Provider 4"
    ],

    "Service 2": [
        "Provider 6",
        "Provider 7",
        "Provider 8"
    ],

    "Service 3": [
        "Provider 2",
        "Provider 3",
        "Provider 5",
        "Provider 6",
        "Provider 7",
        "Provider 8"
    ]

}

export const allocateProviders =
async (lead, session) => {

    const assignedProviders = []

    // MANDATORY PROVIDERS

    const mandatory =
        mandatoryProviders[lead.serviceType]

    for (const providerName of mandatory) {

        const provider =
            await Provider.findOne({
                name: providerName
            }).session(session)

        if (
            provider &&
            provider.leadsAssigned <
            provider.monthlyQuota
        ) {

            assignedProviders.push(provider)

        }

    }

    // REMAINING SLOTS

    const remainingSlots =
        3 - assignedProviders.length

    // ROUND ROBIN POOL

    const pool =
        providerPools[lead.serviceType]

    let allocationState =
        await AllocationState.findOne({
            serviceType: lead.serviceType
        }).session(session)

    // CREATE STATE IF NOT EXISTS

    if (!allocationState) {

        const createdState =
            await AllocationState.create([{

                serviceType:
                    lead.serviceType,

                lastIndex: 0

            }], { session })

        allocationState = createdState[0]

    }

    let currentIndex =
        allocationState.lastIndex

    let added = 0

    // ROUND ROBIN LOGIC

    while (added < remainingSlots) {

        const providerName =
            pool[currentIndex % pool.length]

        const provider =
            await Provider.findOne({
                name: providerName
            }).session(session)

        const alreadyAssigned =
            assignedProviders.find(
                p =>
                    p._id.toString() ===
                    provider._id.toString()
            )

        if (

            provider &&

            !alreadyAssigned &&

            provider.leadsAssigned <
            provider.monthlyQuota

        ) {

            assignedProviders.push(provider)

            added++

        }

        currentIndex++

    }

    // SAVE ROUND ROBIN STATE

    allocationState.lastIndex =
        currentIndex

    await allocationState.save({
        session
    })

    // SAVE ASSIGNMENTS

    for (const provider of assignedProviders) {

        await LeadAssignment.create([{

            leadId: lead._id,

            providerId: provider._id

        }], { session })

        provider.leadsAssigned += 1

        await provider.save({
            session
        })

    }

    return assignedProviders

}