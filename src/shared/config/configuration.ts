export default (): EnvVar => ({
    PORT: parseInt(process.env.PORT, 10) || 3000,
    MONGODB_URI: process.env.MONGODB_URI,
})

export interface EnvVar {
    PORT: number
    MONGODB_URI: string
}
