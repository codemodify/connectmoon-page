var ConnectMoon;
(function (ConnectMoon) {
    var Constants;
    (function (Constants) {
        Constants.k_RemoteitAPIServer = "https://api.remot3.it/apv/v27";
        Constants.k_UserLoginEndpoint = Constants.k_RemoteitAPIServer + "/user/login";
        Constants.k_RemoteitGraphQLEndpoint = "https://api.remote.it/beta/graphql";
    })(Constants = ConnectMoon.Constants || (ConnectMoon.Constants = {}));
})(ConnectMoon || (ConnectMoon = {}));
var ConnectMoon;
(function (ConnectMoon) {
    var Models;
    (function (Models) {
        var Camera = (function () {
            function Camera(init) {
                Object.assign(this, init);
            }
            return Camera;
        }());
        Models.Camera = Camera;
    })(Models = ConnectMoon.Models || (ConnectMoon.Models = {}));
})(ConnectMoon || (ConnectMoon = {}));
var ConnectMoon;
(function (ConnectMoon) {
    var Models;
    (function (Models) {
        var Device = (function () {
            function Device(init) {
                Object.assign(this, init);
            }
            return Device;
        }());
        Models.Device = Device;
    })(Models = ConnectMoon.Models || (ConnectMoon.Models = {}));
})(ConnectMoon || (ConnectMoon = {}));
var ConnectMoon;
(function (ConnectMoon) {
    var helpersEvents = SystemKit.Helpers;
    var helpersNetworking = SystemKit.Helpers;
    var helpersTasks = SystemKit.Helpers;
    var constants = ConnectMoon.Constants;
    var Client = (function () {
        function Client(authToken) {
            this._token = null;
            var thisRef = this;
            thisRef._token = authToken;
            thisRef.Events = {
                DeviceConnected: new helpersEvents.Event(),
                DeviceDisconnected: new helpersEvents.Event(),
                DeviceServiceConnect: new helpersEvents.Event(),
                DeviceServiceDisconnect: new helpersEvents.Event(),
                DeviceScriptExec: new helpersEvents.Event()
            };
        }
        Client.prototype.GetDevices = function (done) {
            var thisRef = this;
            helpersTasks.Run()
                .This(function (localDone) {
                helpersNetworking.DoPostCall(constants.k_RemoteitGraphQLEndpoint, {
                    "Content-Type": "application/json",
                    "token": thisRef._token
                }, JSON.stringify({
                    "query": "{\n                              login {\n                                devices {\n                                  items {\n                                    id\n                                    name\n                                    services {\n                                      id\n                                      access {\n                                        scripting\n                                      }\n                                      bulk\n                                      created\n                                      name\n                                      port\n                                      title\n                                      type\n                                      version\n                                      endpoint {\n                                        id\n                                        city\n                                        connectionType\n                                        continent\n                                        country\n                                        externalAddress\n                                        internalAddress\n                                        isp\n                                        latitude\n                                        longitude\n                                        postal\n                                        region\n                                        serverAddress\n                                        timestamp\n                                        timezone\n                                        availability\n                                        instability\n                                        offlineCount\n                                        offlineDuration\n                                        offlineSince\n                                        onlineCount\n                                        onlineDuration\n                                        onlineSince\n                                        pingInterval\n                                        state\n                                        sessions {\n                                          id\n                                          timestamp\n                                          source {\n                                            id\n                                            city\n                                            connectionType\n                                            continent\n                                            country\n                                            externalAddress\n                                            internalAddress\n                                            isp\n                                            latitude\n                                            longitude\n                                            postal\n                                            region\n                                            serverAddress\n                                            timestamp\n                                            timezone\n                                            type\n                                            platform\n                                            proxy\n                                            version\n                                          }\n                                          target {\n                                            id\n                                            city\n                                            connectionType\n                                            continent\n                                            country\n                                            externalAddress\n                                            internalAddress\n                                            isp\n                                            latitude\n                                            longitude\n                                            postal\n                                            region\n                                            serverAddress\n                                            timestamp\n                                            timezone\n                                            availability\n                                            instability\n                                            offlineCount\n                                            offlineDuration\n                                            offlineSince\n                                            onlineCount\n                                            onlineDuration\n                                            onlineSince\n                                            pingInterval\n                                            state\n                                          }\n                                        }\n                                      }\n                                    }\n                                  }\n                                }\n                              }\n\t\t\t\t\t\t\t}"
                }), function (data) {
                    localDone(data);
                }, function (err) {
                    localDone.fail(err);
                });
            })
                .Then(function (localDone, data) {
                var gqlDevices = data.data.login.devices.items;
                var devices = [];
                for (var i = 0; i < gqlDevices.length; i++) {
                    devices.push(new ConnectMoon.Models.Device({
                        Id: gqlDevices[i].id,
                        Name: gqlDevices[i].name,
                        Latitude: 37.7927731,
                        Longitude: -122.4054696
                    }));
                }
                done(devices);
                localDone();
            })
                .OnError(function (err) {
                done.fail(err);
            });
        };
        return Client;
    }());
    ConnectMoon.Client = Client;
    function NewClient(done, user, pass, developerKey) {
        helpersTasks.Run()
            .This(function (localDone) {
            helpersNetworking.DoPostCall(constants.k_UserLoginEndpoint, {
                "Content-Type": "application/json",
                "developerKey": developerKey
            }, JSON.stringify({
                "username": user,
                "password": pass
            }), function (data) {
                localDone(data);
            }, function (err) {
                localDone.fail(err);
            });
        })
            .Then(function (localDone, data) {
            var client = new Client(data.token);
            done(client);
            localDone();
        })
            .OnError(function (err) {
            done.fail(err);
        });
    }
    ConnectMoon.NewClient = NewClient;
})(ConnectMoon || (ConnectMoon = {}));
var ConnectMoon;
(function (ConnectMoon) {
    var Models;
    (function (Models) {
        var GQLSession = (function () {
            function GQLSession(init) {
                Object.assign(this, init);
            }
            return GQLSession;
        }());
        Models.GQLSession = GQLSession;
        var GQLServiceEndpoint = (function () {
            function GQLServiceEndpoint(init) {
                Object.assign(this, init);
            }
            return GQLServiceEndpoint;
        }());
        Models.GQLServiceEndpoint = GQLServiceEndpoint;
        var GQLUserEndpoint = (function () {
            function GQLUserEndpoint(init) {
                Object.assign(this, init);
            }
            return GQLUserEndpoint;
        }());
        Models.GQLUserEndpoint = GQLUserEndpoint;
        var GQLUser = (function () {
            function GQLUser(init) {
                Object.assign(this, init);
            }
            return GQLUser;
        }());
        Models.GQLUser = GQLUser;
        var GQLAccess = (function () {
            function GQLAccess(init) {
                Object.assign(this, init);
            }
            return GQLAccess;
        }());
        Models.GQLAccess = GQLAccess;
        var GQLService = (function () {
            function GQLService(init) {
                Object.assign(this, init);
            }
            return GQLService;
        }());
        Models.GQLService = GQLService;
        var GQLDevice = (function () {
            function GQLDevice(init) {
                Object.assign(this, init);
            }
            return GQLDevice;
        }());
        Models.GQLDevice = GQLDevice;
    })(Models = ConnectMoon.Models || (ConnectMoon.Models = {}));
})(ConnectMoon || (ConnectMoon = {}));
//# sourceMappingURL=connectmoon-sdk-js.js.map