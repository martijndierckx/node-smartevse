export declare class ModbusConnection {
    private socket;
    private conn;
    static connect(config: {
        port: number;
        host: string;
        slaveId: number;
    }): Promise<ModbusConnection>;
    disconnect(): Promise<void>;
    getRegister(address: number): Promise<number>;
    getRegisterRange(startAddress: number, quantity: number): Promise<{
        [address: number]: number;
    }>;
}
