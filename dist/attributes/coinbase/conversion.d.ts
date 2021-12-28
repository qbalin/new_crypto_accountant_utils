interface Conversion {
    readonly id: string;
    readonly amount: string;
    readonly balance: string;
    readonly created_at: string;
    readonly details: {
        conversion_id: string;
    };
}
export default Conversion;
