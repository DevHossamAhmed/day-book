
export async function registerOrganization(name: string, domain: string): Promise<void> {
    try {
        // Simulate API call to register organization
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(`Organization ${name} with domain ${domain} registered successfully.`);
    } catch (error: any) {
        console.error("Error registering organization:", error);
        throw new Error("Failed to register organization");
    }
}