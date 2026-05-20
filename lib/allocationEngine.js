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
async (lead) => {

    try {

        const assignedProviders = []

        // GET ALL PROVIDERS ONCE

        const allProviders =
            await Provider.find()

        // CONVERT TO MAP

        const providerMap = {}

        allProviders.forEach(provider => {

            providerMap[provider.name] =
                provider

        })

        // MANDATORY PROVIDERS

        const mandatory =
            mandatoryProviders[
                lead.serviceType
            ] || []

        for (const providerName of mandatory) {

            const provider =
                providerMap[providerName]

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
            providerPools[
                lead.serviceType
            ] || []

        // GET ALLOCATION STATE

        let allocationState =
            await AllocationState.findOne({

                serviceType:
                    lead.serviceType

            })

        // CREATE IF NOT EXISTS

        if (!allocationState) {

            allocationState =
                await AllocationState.create({

                    serviceType:
                        lead.serviceType,

                    lastIndex: 0

                })

        }

        let currentIndex =
            allocationState.lastIndex

        let added = 0

        let attempts = 0

        // SAFETY LIMIT

        const maxAttempts =
            pool.length * 2

        // ROUND ROBIN LOGIC

        while (

            added < remainingSlots &&
            attempts < maxAttempts

        ) {

            const providerName =
                pool[currentIndex % pool.length]

            const provider =
                providerMap[providerName]

            const alreadyAssigned =
                assignedProviders.some(
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

            attempts++

        }

        // SAVE ROUND ROBIN STATE

        allocationState.lastIndex =
            currentIndex

        await allocationState.save()

        // SAVE ASSIGNMENTS

        for (const provider of assignedProviders) {

            await LeadAssignment.create({

                leadId: lead._id,

                providerId: provider._id

            })

            provider.leadsAssigned += 1

            await provider.save()

        }

        return assignedProviders

    } catch (error) {

        console.log(
            "Allocation Error:",
            error
        )

        throw error

    }

}