export type User = {
    email?: string,
    display_name?: string,
    is_premium?: boolean,
    createdAt?: string,
    subscriptions?: [
        {
            status: string,
            startDate: string,
            endDate: string,
            plan: {
                name: string,
                description: string
            }
        }
    ]
}