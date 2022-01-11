import * as Modbus from 'jsmodbus';
import { Socket } from 'net';

export class ModbusConnection {
  private socket: Socket;
  private conn: Modbus.ModbusTCPClient = null;

  public static async connect(config: { port: number; host: string; slaveId: number }): Promise<ModbusConnection> {
    return new Promise((resolve) => {
      const modbusConn = new ModbusConnection();
      modbusConn.socket = new Socket();
      modbusConn.conn = new Modbus.client.TCP(modbusConn.socket, config.slaveId, 3000);

      // Events
      modbusConn.socket.on('connect', () => {
        resolve(modbusConn);
      });
      modbusConn.socket.on('end', () => {
        modbusConn.conn = null;
        // TODO reconnect on request?
      });

      modbusConn.socket.connect(config);
    });
  }

  public async disconnect() {
    this.socket.end(() => {
      return;
    });
  }

  public async getRegister(address: number): Promise<number> {
    const register = await this.getRegisterRange(address, 1);
    return register[address];
  }

  public async getRegisterRange(startAddress: number, quantity: number): Promise<{ [address: number]: number }> {
    const res = await this.conn.readInputRegisters(startAddress, quantity);

    // Was data returned?
    if (res.response && res.response.body && !res.response.body.isException && res.response.body.byteCount > 0) {
      // Convert to correctly addressed object
      const data = {};
      for (const [i, val] of res.response.body.values.entries()) {
        data[startAddress + i] = val;
      }

      // Return data
      return data;
    }

    // Nothing returned
    throw Error(`Failed retrieving register range ${startAddress} - ${startAddress + quantity - 1}`);
  }
}
