import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    //clientId: 'b3544b0c-1209-4fe8-b799-8f63a0179fa0',
    clientId: '5959dabe-045c-462e-8764-654c573239d1',
    authority: "https://login.microsoftonline.com/e773e193-89d3-44d9-ae4e-17766699f674",
  },
  cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {	
      loggerOptions: {	
          loggerCallback: (level, message, containsPii) => {	
              if (containsPii) {		
                  return;		
              }		
              switch (level) {		
                  case LogLevel.Error:		
                      console.error(message);		
                      return;		
                  case LogLevel.Info:		
                      console.info(message);		
                      return;		
                  case LogLevel.Verbose:		
                      console.debug(message);		
                      return;		
                  case LogLevel.Warning:		
                      console.warn(message);		
                      return;		
              }	
          }	
      }	
  }
};
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: ["User.Read"]
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
  };