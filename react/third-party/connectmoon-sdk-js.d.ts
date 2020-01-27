/// <reference path="SystemKit-JS.d.ts" />
declare namespace ConnectMoon.Constants {
    var k_RemoteitAPIServer: string;
    var k_UserLoginEndpoint: string;
    var k_RemoteitGraphQLEndpoint: string;
}
declare namespace ConnectMoon.Models {
    class Camera {
        Id: string;
        Name: string;
        StreamUrl: string;
        LastPicUrl: string;
        IsStreaming: boolean;
        constructor(init?: Partial<Camera>);
    }
}
declare namespace ConnectMoon.Models {
    class Device {
        Id: string;
        Type: string;
        Name: string;
        IsConnected: boolean;
        ConnectedAt: string;
        DisconnectedAt: string;
        Telemetry: any[];
        Cameras: Camera[];
        Latitude: number;
        Longitude: number;
        constructor(init?: Partial<Device>);
    }
}
declare namespace ConnectMoon {
    import helpersEvents = SystemKit.Helpers;
    class Client {
        private _token;
        Events: {
            DeviceConnected: helpersEvents.Event<{
                DeviceId: string;
            }>;
            DeviceDisconnected: helpersEvents.Event<{
                DeviceId: string;
            }>;
            DeviceServiceConnect: helpersEvents.Event<{
                DeviceId: string;
                ServiceId: string;
            }>;
            DeviceServiceDisconnect: helpersEvents.Event<{
                DeviceId: string;
                ServiceId: string;
            }>;
            DeviceScriptExec: helpersEvents.Event<{
                DeviceId: string;
                Payload: string;
            }>;
        };
        constructor(authToken: string);
        GetDevices(done: any): void;
    }
    function NewClient(done: any, user: string, pass: string, developerKey: string): void;
}
declare namespace ConnectMoon.Models {
    class GQLSession {
        Id: string;
        Timestamp: string;
        Source: GQLUserEndpoint;
        Target: GQLServiceEndpoint;
        constructor(init?: Partial<GQLSession>);
    }
    class GQLServiceEndpoint {
        Id: string;
        City: string;
        ConnectionType: string;
        Continent: string;
        Country: string;
        ExternalAddress: string;
        InternalAddress: string;
        ISP: string;
        Latitude: string;
        Longitude: string;
        Postal: string;
        Region: string;
        ServerAddress: string;
        Timestamp: string;
        TimeZone: string;
        Sessions: GQLSession[];
        Availability: number;
        Instability: number;
        OfflineCount: number;
        OfflineDuration: number;
        OfflineSince: number;
        OnlineCount: number;
        OnlineDuration: number;
        OnlineSince: number;
        PingInterval: number;
        State: string;
        constructor(init?: Partial<GQLServiceEndpoint>);
    }
    class GQLUserEndpoint {
        Id: string;
        City: string;
        ConnectionType: string;
        Continent: string;
        Country: string;
        ExternalAddress: string;
        InternalAddress: string;
        ISP: string;
        Latitude: string;
        Longitude: string;
        Postal: string;
        Region: string;
        ServerAddress: string;
        Timestamp: string;
        TimeZone: string;
        Type: string;
        Platform: string;
        Proxy: boolean;
        Version: string;
        constructor(init?: Partial<GQLUserEndpoint>);
    }
    class GQLUser {
        Id: string;
        Created: string;
        Email: string;
        Language: string;
        LastLogin: string;
        Timezone: string;
        constructor(init?: Partial<GQLUser>);
    }
    class GQLAccess {
        Scripting: boolean;
        User: GQLUser;
        constructor(init?: Partial<GQLAccess>);
    }
    class GQLService {
        Id: string;
        Access: GQLAccess;
        Application: number;
        Bulk: boolean;
        Created: string;
        Endpoint: GQLServiceEndpoint;
        Name: string;
        Port: number;
        Title: string;
        Type: string;
        Version: string;
        constructor(init?: Partial<GQLService>);
    }
    class GQLDevice {
        id: string;
        name: string;
        services: GQLService[];
        constructor(init?: Partial<GQLDevice>);
    }
}
