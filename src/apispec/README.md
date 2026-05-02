# sandbox0@0.1.0

A TypeScript SDK client for the api.sandbox0.ai API.

## Usage

First, install the SDK from npm.

```bash
npm install sandbox0 --save
```

Next, try it out.


```ts
import {
  Configuration,
  ApiKeysApi,
} from 'sandbox0';
import type { ApiKeysCurrentGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ApiKeysApi(config);

  try {
    const data = await api.apiKeysCurrentGet();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```


## Documentation

### API Endpoints

All URIs are relative to *https://api.sandbox0.ai*

| Class | Method | HTTP request | Description
| ----- | ------ | ------------ | -------------
*ApiKeysApi* | [**apiKeysCurrentGet**](docs/ApiKeysApi.md#apikeyscurrentget) | **GET** /api-keys/current | Introspect current API key
*ApiKeysApi* | [**apiKeysGet**](docs/ApiKeysApi.md#apikeysget) | **GET** /api-keys | List API keys
*ApiKeysApi* | [**apiKeysIdDeactivatePost**](docs/ApiKeysApi.md#apikeysiddeactivatepost) | **POST** /api-keys/{id}/deactivate | Deactivate API key
*ApiKeysApi* | [**apiKeysIdDelete**](docs/ApiKeysApi.md#apikeysiddelete) | **DELETE** /api-keys/{id} | Delete API key
*ApiKeysApi* | [**apiKeysPost**](docs/ApiKeysApi.md#apikeyspost) | **POST** /api-keys | Create API key
*AuthApi* | [**authChangePasswordPost**](docs/AuthApi.md#authchangepasswordpost) | **POST** /auth/change-password | Change password
*AuthApi* | [**authLoginPost**](docs/AuthApi.md#authloginpost) | **POST** /auth/login | Login with email and password
*AuthApi* | [**authLogoutPost**](docs/AuthApi.md#authlogoutpost) | **POST** /auth/logout | Logout
*AuthApi* | [**authOidcProviderCallbackGet**](docs/AuthApi.md#authoidcprovidercallbackget) | **GET** /auth/oidc/{provider}/callback | OIDC callback
*AuthApi* | [**authOidcProviderDevicePollPost**](docs/AuthApi.md#authoidcproviderdevicepollpost) | **POST** /auth/oidc/{provider}/device/poll | Poll OIDC device login
*AuthApi* | [**authOidcProviderDeviceStartPost**](docs/AuthApi.md#authoidcproviderdevicestartpost) | **POST** /auth/oidc/{provider}/device/start | Start OIDC device login
*AuthApi* | [**authOidcProviderLoginGet**](docs/AuthApi.md#authoidcproviderloginget) | **GET** /auth/oidc/{provider}/login | Initiate OIDC login
*AuthApi* | [**authProvidersGet**](docs/AuthApi.md#authprovidersget) | **GET** /auth/providers | Get available auth providers
*AuthApi* | [**authRefreshPost**](docs/AuthApi.md#authrefreshpost) | **POST** /auth/refresh | Refresh access token
*AuthApi* | [**authRegisterPost**](docs/AuthApi.md#authregisterpost) | **POST** /auth/register | Register a new user
*AuthApi* | [**authWebLoginExchangePost**](docs/AuthApi.md#authwebloginexchangepost) | **POST** /auth/web-login/exchange | Exchange web login code
*ContextsApi* | [**apiV1SandboxesIdContextsCtxIdDelete**](docs/ContextsApi.md#apiv1sandboxesidcontextsctxiddelete) | **DELETE** /api/v1/sandboxes/{id}/contexts/{ctx_id} | Delete context
*ContextsApi* | [**apiV1SandboxesIdContextsCtxIdExecPost**](docs/ContextsApi.md#apiv1sandboxesidcontextsctxidexecpost) | **POST** /api/v1/sandboxes/{id}/contexts/{ctx_id}/exec | Execute context input (sync)
*ContextsApi* | [**apiV1SandboxesIdContextsCtxIdGet**](docs/ContextsApi.md#apiv1sandboxesidcontextsctxidget) | **GET** /api/v1/sandboxes/{id}/contexts/{ctx_id} | Get context
*ContextsApi* | [**apiV1SandboxesIdContextsCtxIdInputPost**](docs/ContextsApi.md#apiv1sandboxesidcontextsctxidinputpost) | **POST** /api/v1/sandboxes/{id}/contexts/{ctx_id}/input | Send input to context
*ContextsApi* | [**apiV1SandboxesIdContextsCtxIdResizePost**](docs/ContextsApi.md#apiv1sandboxesidcontextsctxidresizepost) | **POST** /api/v1/sandboxes/{id}/contexts/{ctx_id}/resize | Resize context PTY
*ContextsApi* | [**apiV1SandboxesIdContextsCtxIdRestartPost**](docs/ContextsApi.md#apiv1sandboxesidcontextsctxidrestartpost) | **POST** /api/v1/sandboxes/{id}/contexts/{ctx_id}/restart | Restart context
*ContextsApi* | [**apiV1SandboxesIdContextsCtxIdSignalPost**](docs/ContextsApi.md#apiv1sandboxesidcontextsctxidsignalpost) | **POST** /api/v1/sandboxes/{id}/contexts/{ctx_id}/signal | Send signal to context
*ContextsApi* | [**apiV1SandboxesIdContextsCtxIdStatsGet**](docs/ContextsApi.md#apiv1sandboxesidcontextsctxidstatsget) | **GET** /api/v1/sandboxes/{id}/contexts/{ctx_id}/stats | Get context stats
*ContextsApi* | [**apiV1SandboxesIdContextsCtxIdWsGet**](docs/ContextsApi.md#apiv1sandboxesidcontextsctxidwsget) | **GET** /api/v1/sandboxes/{id}/contexts/{ctx_id}/ws | Context WebSocket (I/O)
*ContextsApi* | [**apiV1SandboxesIdContextsGet**](docs/ContextsApi.md#apiv1sandboxesidcontextsget) | **GET** /api/v1/sandboxes/{id}/contexts | List contexts
*ContextsApi* | [**apiV1SandboxesIdContextsPost**](docs/ContextsApi.md#apiv1sandboxesidcontextspost) | **POST** /api/v1/sandboxes/{id}/contexts | Create a context
*CredentialSourcesApi* | [**apiV1CredentialSourcesGet**](docs/CredentialSourcesApi.md#apiv1credentialsourcesget) | **GET** /api/v1/credential-sources | List credential sources
*CredentialSourcesApi* | [**apiV1CredentialSourcesNameDelete**](docs/CredentialSourcesApi.md#apiv1credentialsourcesnamedelete) | **DELETE** /api/v1/credential-sources/{name} | Delete credential source
*CredentialSourcesApi* | [**apiV1CredentialSourcesNameGet**](docs/CredentialSourcesApi.md#apiv1credentialsourcesnameget) | **GET** /api/v1/credential-sources/{name} | Get credential source
*CredentialSourcesApi* | [**apiV1CredentialSourcesNamePut**](docs/CredentialSourcesApi.md#apiv1credentialsourcesnameput) | **PUT** /api/v1/credential-sources/{name} | Update credential source
*CredentialSourcesApi* | [**apiV1CredentialSourcesPost**](docs/CredentialSourcesApi.md#apiv1credentialsourcespost) | **POST** /api/v1/credential-sources | Create credential source
*FilesApi* | [**apiV1SandboxesIdFilesDelete**](docs/FilesApi.md#apiv1sandboxesidfilesdelete) | **DELETE** /api/v1/sandboxes/{id}/files | Delete file or directory
*FilesApi* | [**apiV1SandboxesIdFilesGet**](docs/FilesApi.md#apiv1sandboxesidfilesget) | **GET** /api/v1/sandboxes/{id}/files | Read file content
*FilesApi* | [**apiV1SandboxesIdFilesListGet**](docs/FilesApi.md#apiv1sandboxesidfileslistget) | **GET** /api/v1/sandboxes/{id}/files/list | List directory entries
*FilesApi* | [**apiV1SandboxesIdFilesMovePost**](docs/FilesApi.md#apiv1sandboxesidfilesmovepost) | **POST** /api/v1/sandboxes/{id}/files/move | Move a file or directory
*FilesApi* | [**apiV1SandboxesIdFilesPost**](docs/FilesApi.md#apiv1sandboxesidfilespost) | **POST** /api/v1/sandboxes/{id}/files | Write file or create directory
*FilesApi* | [**apiV1SandboxesIdFilesStatGet**](docs/FilesApi.md#apiv1sandboxesidfilesstatget) | **GET** /api/v1/sandboxes/{id}/files/stat | Stat a file
*FilesApi* | [**apiV1SandboxesIdFilesWatchGet**](docs/FilesApi.md#apiv1sandboxesidfileswatchget) | **GET** /api/v1/sandboxes/{id}/files/watch | File watch WebSocket
*FilesApi* | [**apiV1SandboxvolumesIdFilesDelete**](docs/FilesApi.md#apiv1sandboxvolumesidfilesdelete) | **DELETE** /api/v1/sandboxvolumes/{id}/files | Delete volume file or directory
*FilesApi* | [**apiV1SandboxvolumesIdFilesGet**](docs/FilesApi.md#apiv1sandboxvolumesidfilesget) | **GET** /api/v1/sandboxvolumes/{id}/files | Read volume file content
*FilesApi* | [**apiV1SandboxvolumesIdFilesListGet**](docs/FilesApi.md#apiv1sandboxvolumesidfileslistget) | **GET** /api/v1/sandboxvolumes/{id}/files/list | List volume directory entries
*FilesApi* | [**apiV1SandboxvolumesIdFilesMovePost**](docs/FilesApi.md#apiv1sandboxvolumesidfilesmovepost) | **POST** /api/v1/sandboxvolumes/{id}/files/move | Move a volume file or directory
*FilesApi* | [**apiV1SandboxvolumesIdFilesPost**](docs/FilesApi.md#apiv1sandboxvolumesidfilespost) | **POST** /api/v1/sandboxvolumes/{id}/files | Write volume file or create directory
*FilesApi* | [**apiV1SandboxvolumesIdFilesStatGet**](docs/FilesApi.md#apiv1sandboxvolumesidfilesstatget) | **GET** /api/v1/sandboxvolumes/{id}/files/stat | Stat a volume file
*FilesApi* | [**apiV1SandboxvolumesIdFilesWatchGet**](docs/FilesApi.md#apiv1sandboxvolumesidfileswatchget) | **GET** /api/v1/sandboxvolumes/{id}/files/watch | Volume file watch WebSocket
*HealthApi* | [**healthzGet**](docs/HealthApi.md#healthzget) | **GET** /healthz | Health check
*HealthApi* | [**metadataGet**](docs/HealthApi.md#metadataget) | **GET** /metadata | Gateway metadata
*HealthApi* | [**metricsGet**](docs/HealthApi.md#metricsget) | **GET** /metrics | Prometheus metrics
*HealthApi* | [**readyzGet**](docs/HealthApi.md#readyzget) | **GET** /readyz | Readiness check
*RegionsApi* | [**regionsGet**](docs/RegionsApi.md#regionsget) | **GET** /regions | List regions in the global gateway
*RegionsApi* | [**regionsIdDelete**](docs/RegionsApi.md#regionsiddelete) | **DELETE** /regions/{id} | Delete a region from the global gateway
*RegionsApi* | [**regionsIdGet**](docs/RegionsApi.md#regionsidget) | **GET** /regions/{id} | Get a region from the global gateway
*RegionsApi* | [**regionsIdPut**](docs/RegionsApi.md#regionsidput) | **PUT** /regions/{id} | Update a region in the global gateway
*RegionsApi* | [**regionsPost**](docs/RegionsApi.md#regionspost) | **POST** /regions | Create a region in the global gateway
*RegistryApi* | [**apiV1RegistryCredentialsPost**](docs/RegistryApi.md#apiv1registrycredentialspost) | **POST** /api/v1/registry/credentials | Get registry credentials for uploads
*SandboxVolumesApi* | [**apiV1SandboxvolumesGet**](docs/SandboxVolumesApi.md#apiv1sandboxvolumesget) | **GET** /api/v1/sandboxvolumes | List sandbox volumes
*SandboxVolumesApi* | [**apiV1SandboxvolumesIdDelete**](docs/SandboxVolumesApi.md#apiv1sandboxvolumesiddelete) | **DELETE** /api/v1/sandboxvolumes/{id} | Delete sandbox volume
*SandboxVolumesApi* | [**apiV1SandboxvolumesIdForkPost**](docs/SandboxVolumesApi.md#apiv1sandboxvolumesidforkpost) | **POST** /api/v1/sandboxvolumes/{id}/fork | Fork sandbox volume
*SandboxVolumesApi* | [**apiV1SandboxvolumesIdGet**](docs/SandboxVolumesApi.md#apiv1sandboxvolumesidget) | **GET** /api/v1/sandboxvolumes/{id} | Get sandbox volume
*SandboxVolumesApi* | [**apiV1SandboxvolumesPost**](docs/SandboxVolumesApi.md#apiv1sandboxvolumespost) | **POST** /api/v1/sandboxvolumes | Create sandbox volume
*SandboxesApi* | [**apiV1SandboxesGet**](docs/SandboxesApi.md#apiv1sandboxesget) | **GET** /api/v1/sandboxes | List sandboxes
*SandboxesApi* | [**apiV1SandboxesIdDelete**](docs/SandboxesApi.md#apiv1sandboxesiddelete) | **DELETE** /api/v1/sandboxes/{id} | Delete (terminate) a sandbox
*SandboxesApi* | [**apiV1SandboxesIdExposedPortsDelete**](docs/SandboxesApi.md#apiv1sandboxesidexposedportsdelete) | **DELETE** /api/v1/sandboxes/{id}/exposed-ports | Clear all exposed ports
*SandboxesApi* | [**apiV1SandboxesIdExposedPortsGet**](docs/SandboxesApi.md#apiv1sandboxesidexposedportsget) | **GET** /api/v1/sandboxes/{id}/exposed-ports | Get sandbox exposed ports
*SandboxesApi* | [**apiV1SandboxesIdExposedPortsPortDelete**](docs/SandboxesApi.md#apiv1sandboxesidexposedportsportdelete) | **DELETE** /api/v1/sandboxes/{id}/exposed-ports/{port} | Remove a specific exposed port
*SandboxesApi* | [**apiV1SandboxesIdExposedPortsPut**](docs/SandboxesApi.md#apiv1sandboxesidexposedportsput) | **PUT** /api/v1/sandboxes/{id}/exposed-ports | Update sandbox exposed ports
*SandboxesApi* | [**apiV1SandboxesIdGet**](docs/SandboxesApi.md#apiv1sandboxesidget) | **GET** /api/v1/sandboxes/{id} | Get sandbox by ID
*SandboxesApi* | [**apiV1SandboxesIdLogsGet**](docs/SandboxesApi.md#apiv1sandboxesidlogsget) | **GET** /api/v1/sandboxes/{id}/logs | Get sandbox process logs
*SandboxesApi* | [**apiV1SandboxesIdNetworkGet**](docs/SandboxesApi.md#apiv1sandboxesidnetworkget) | **GET** /api/v1/sandboxes/{id}/network | Get sandbox network policy
*SandboxesApi* | [**apiV1SandboxesIdNetworkPut**](docs/SandboxesApi.md#apiv1sandboxesidnetworkput) | **PUT** /api/v1/sandboxes/{id}/network | Update sandbox network policy
*SandboxesApi* | [**apiV1SandboxesIdPausePost**](docs/SandboxesApi.md#apiv1sandboxesidpausepost) | **POST** /api/v1/sandboxes/{id}/pause | Pause a sandbox
*SandboxesApi* | [**apiV1SandboxesIdPublicGatewayGet**](docs/SandboxesApi.md#apiv1sandboxesidpublicgatewayget) | **GET** /api/v1/sandboxes/{id}/public-gateway | Get sandbox public gateway policy
*SandboxesApi* | [**apiV1SandboxesIdPublicGatewayPut**](docs/SandboxesApi.md#apiv1sandboxesidpublicgatewayput) | **PUT** /api/v1/sandboxes/{id}/public-gateway | Update sandbox public gateway policy
*SandboxesApi* | [**apiV1SandboxesIdPut**](docs/SandboxesApi.md#apiv1sandboxesidput) | **PUT** /api/v1/sandboxes/{id} | Update sandbox configuration
*SandboxesApi* | [**apiV1SandboxesIdRefreshPost**](docs/SandboxesApi.md#apiv1sandboxesidrefreshpost) | **POST** /api/v1/sandboxes/{id}/refresh | Refresh sandbox TTL
*SandboxesApi* | [**apiV1SandboxesIdResumePost**](docs/SandboxesApi.md#apiv1sandboxesidresumepost) | **POST** /api/v1/sandboxes/{id}/resume | Resume a sandbox
*SandboxesApi* | [**apiV1SandboxesIdStatusGet**](docs/SandboxesApi.md#apiv1sandboxesidstatusget) | **GET** /api/v1/sandboxes/{id}/status | Get sandbox status
*SandboxesApi* | [**apiV1SandboxesPost**](docs/SandboxesApi.md#apiv1sandboxespost) | **POST** /api/v1/sandboxes | Create (claim) a sandbox
*SnapshotsApi* | [**apiV1SandboxvolumesIdSnapshotsGet**](docs/SnapshotsApi.md#apiv1sandboxvolumesidsnapshotsget) | **GET** /api/v1/sandboxvolumes/{id}/snapshots | List snapshots
*SnapshotsApi* | [**apiV1SandboxvolumesIdSnapshotsPost**](docs/SnapshotsApi.md#apiv1sandboxvolumesidsnapshotspost) | **POST** /api/v1/sandboxvolumes/{id}/snapshots | Create snapshot
*SnapshotsApi* | [**apiV1SandboxvolumesIdSnapshotsSnapshotIdDelete**](docs/SnapshotsApi.md#apiv1sandboxvolumesidsnapshotssnapshotiddelete) | **DELETE** /api/v1/sandboxvolumes/{id}/snapshots/{snapshot_id} | Delete snapshot
*SnapshotsApi* | [**apiV1SandboxvolumesIdSnapshotsSnapshotIdGet**](docs/SnapshotsApi.md#apiv1sandboxvolumesidsnapshotssnapshotidget) | **GET** /api/v1/sandboxvolumes/{id}/snapshots/{snapshot_id} | Get snapshot
*SnapshotsApi* | [**apiV1SandboxvolumesIdSnapshotsSnapshotIdRestorePost**](docs/SnapshotsApi.md#apiv1sandboxvolumesidsnapshotssnapshotidrestorepost) | **POST** /api/v1/sandboxvolumes/{id}/snapshots/{snapshot_id}/restore | Restore snapshot
*TeamsApi* | [**teamsGet**](docs/TeamsApi.md#teamsget) | **GET** /teams | List teams
*TeamsApi* | [**teamsIdDelete**](docs/TeamsApi.md#teamsiddelete) | **DELETE** /teams/{id} | Delete a team
*TeamsApi* | [**teamsIdGet**](docs/TeamsApi.md#teamsidget) | **GET** /teams/{id} | Get a team
*TeamsApi* | [**teamsIdMembersGet**](docs/TeamsApi.md#teamsidmembersget) | **GET** /teams/{id}/members | List team members
*TeamsApi* | [**teamsIdMembersPost**](docs/TeamsApi.md#teamsidmemberspost) | **POST** /teams/{id}/members | Add team member
*TeamsApi* | [**teamsIdMembersUserIdDelete**](docs/TeamsApi.md#teamsidmembersuseriddelete) | **DELETE** /teams/{id}/members/{userId} | Remove team member
*TeamsApi* | [**teamsIdMembersUserIdPut**](docs/TeamsApi.md#teamsidmembersuseridput) | **PUT** /teams/{id}/members/{userId} | Update team member role
*TeamsApi* | [**teamsIdPut**](docs/TeamsApi.md#teamsidput) | **PUT** /teams/{id} | Update a team
*TeamsApi* | [**teamsPost**](docs/TeamsApi.md#teamspost) | **POST** /teams | Create a team
*TemplatesApi* | [**apiV1TemplatesGet**](docs/TemplatesApi.md#apiv1templatesget) | **GET** /api/v1/templates | List templates
*TemplatesApi* | [**apiV1TemplatesIdDelete**](docs/TemplatesApi.md#apiv1templatesiddelete) | **DELETE** /api/v1/templates/{id} | Delete template
*TemplatesApi* | [**apiV1TemplatesIdGet**](docs/TemplatesApi.md#apiv1templatesidget) | **GET** /api/v1/templates/{id} | Get template
*TemplatesApi* | [**apiV1TemplatesIdPut**](docs/TemplatesApi.md#apiv1templatesidput) | **PUT** /api/v1/templates/{id} | Update template
*TemplatesApi* | [**apiV1TemplatesPost**](docs/TemplatesApi.md#apiv1templatespost) | **POST** /api/v1/templates | Create template
*UsersApi* | [**usersMeGet**](docs/UsersApi.md#usersmeget) | **GET** /users/me | Get current user
*UsersApi* | [**usersMeIdentitiesGet**](docs/UsersApi.md#usersmeidentitiesget) | **GET** /users/me/identities | List current user identities
*UsersApi* | [**usersMeIdentitiesIdDelete**](docs/UsersApi.md#usersmeidentitiesiddelete) | **DELETE** /users/me/identities/{id} | Delete a user identity
*UsersApi* | [**usersMePut**](docs/UsersApi.md#usersmeput) | **PUT** /users/me | Update current user
*UsersApi* | [**usersMeSshKeysGet**](docs/UsersApi.md#usersmesshkeysget) | **GET** /users/me/ssh-keys | List current user SSH public keys
*UsersApi* | [**usersMeSshKeysIdDelete**](docs/UsersApi.md#usersmesshkeysiddelete) | **DELETE** /users/me/ssh-keys/{id} | Delete a current user SSH public key
*UsersApi* | [**usersMeSshKeysPost**](docs/UsersApi.md#usersmesshkeyspost) | **POST** /users/me/ssh-keys | Create a current user SSH public key


### Models

- [APIKey](docs/APIKey.md)
- [AddTeamMemberRequest](docs/AddTeamMemberRequest.md)
- [Affinity](docs/Affinity.md)
- [ApiV1SandboxesIdFilesGet200Response](docs/ApiV1SandboxesIdFilesGet200Response.md)
- [AuthProvider](docs/AuthProvider.md)
- [CachePolicySpec](docs/CachePolicySpec.md)
- [Capabilities](docs/Capabilities.md)
- [ChangePasswordRequest](docs/ChangePasswordRequest.md)
- [ClaimMountRequest](docs/ClaimMountRequest.md)
- [ClaimRequest](docs/ClaimRequest.md)
- [ClaimResponse](docs/ClaimResponse.md)
- [ContainerSpec](docs/ContainerSpec.md)
- [ContextExecResponse](docs/ContextExecResponse.md)
- [ContextInputRequest](docs/ContextInputRequest.md)
- [ContextResourceUsage](docs/ContextResourceUsage.md)
- [ContextResponse](docs/ContextResponse.md)
- [ContextStatsResponse](docs/ContextStatsResponse.md)
- [ContextWebSocketDone](docs/ContextWebSocketDone.md)
- [ContextWebSocketInput](docs/ContextWebSocketInput.md)
- [ContextWebSocketOutput](docs/ContextWebSocketOutput.md)
- [ContextWebSocketRequest](docs/ContextWebSocketRequest.md)
- [ContextWebSocketResize](docs/ContextWebSocketResize.md)
- [ContextWebSocketResponse](docs/ContextWebSocketResponse.md)
- [ContextWebSocketSignal](docs/ContextWebSocketSignal.md)
- [CreateAPIKeyRequest](docs/CreateAPIKeyRequest.md)
- [CreateAPIKeyResponse](docs/CreateAPIKeyResponse.md)
- [CreateCMDContextRequest](docs/CreateCMDContextRequest.md)
- [CreateContextRequest](docs/CreateContextRequest.md)
- [CreateREPLContextRequest](docs/CreateREPLContextRequest.md)
- [CreateRegionRequest](docs/CreateRegionRequest.md)
- [CreateSSHPublicKeyRequest](docs/CreateSSHPublicKeyRequest.md)
- [CreateSandboxVolumeRequest](docs/CreateSandboxVolumeRequest.md)
- [CreateSnapshotRequest](docs/CreateSnapshotRequest.md)
- [CreateTeamRequest](docs/CreateTeamRequest.md)
- [CredentialBinding](docs/CredentialBinding.md)
- [CredentialProjectionType](docs/CredentialProjectionType.md)
- [CredentialSourceMetadata](docs/CredentialSourceMetadata.md)
- [CredentialSourceResolverKind](docs/CredentialSourceResolverKind.md)
- [CredentialSourceWriteRequest](docs/CredentialSourceWriteRequest.md)
- [CredentialSourceWriteSpec](docs/CredentialSourceWriteSpec.md)
- [CurrentAPIKeyResponse](docs/CurrentAPIKeyResponse.md)
- [DeviceLoginPollRequest](docs/DeviceLoginPollRequest.md)
- [DeviceLoginPollResponse](docs/DeviceLoginPollResponse.md)
- [DeviceLoginStartResponse](docs/DeviceLoginStartResponse.md)
- [EgressAuthFailurePolicy](docs/EgressAuthFailurePolicy.md)
- [EgressAuthProtocol](docs/EgressAuthProtocol.md)
- [EgressAuthRolloutMode](docs/EgressAuthRolloutMode.md)
- [EgressCredentialRule](docs/EgressCredentialRule.md)
- [EgressTLSMode](docs/EgressTLSMode.md)
- [EnvVar](docs/EnvVar.md)
- [ErrorEnvelope](docs/ErrorEnvelope.md)
- [ExecAction](docs/ExecAction.md)
- [ExecCandidate](docs/ExecCandidate.md)
- [ExposedPortConfig](docs/ExposedPortConfig.md)
- [FileContentResponse](docs/FileContentResponse.md)
- [FileInfo](docs/FileInfo.md)
- [FileWatchError](docs/FileWatchError.md)
- [FileWatchEvent](docs/FileWatchEvent.md)
- [FileWatchRequest](docs/FileWatchRequest.md)
- [FileWatchResponse](docs/FileWatchResponse.md)
- [FileWatchSubscribeRequest](docs/FileWatchSubscribeRequest.md)
- [FileWatchSubscribed](docs/FileWatchSubscribed.md)
- [FileWatchUnsubscribeRequest](docs/FileWatchUnsubscribeRequest.md)
- [FileWatchUnsubscribed](docs/FileWatchUnsubscribed.md)
- [ForkVolumeRequest](docs/ForkVolumeRequest.md)
- [GRPCAction](docs/GRPCAction.md)
- [GatewayMetadata](docs/GatewayMetadata.md)
- [HTTPGetAction](docs/HTTPGetAction.md)
- [HTTPHeader](docs/HTTPHeader.md)
- [HTTPHeadersProjection](docs/HTTPHeadersProjection.md)
- [Identity](docs/Identity.md)
- [LabelSelector](docs/LabelSelector.md)
- [LabelSelectorRequirement](docs/LabelSelectorRequirement.md)
- [LifecyclePolicy](docs/LifecyclePolicy.md)
- [LoginRequest](docs/LoginRequest.md)
- [LoginResponse](docs/LoginResponse.md)
- [ModelError](docs/ModelError.md)
- [MountStatus](docs/MountStatus.md)
- [MoveFileRequest](docs/MoveFileRequest.md)
- [NetworkEgressPolicy](docs/NetworkEgressPolicy.md)
- [NodeAffinity](docs/NodeAffinity.md)
- [NodeSelector](docs/NodeSelector.md)
- [NodeSelectorRequirement](docs/NodeSelectorRequirement.md)
- [NodeSelectorTerm](docs/NodeSelectorTerm.md)
- [ObjectMeta](docs/ObjectMeta.md)
- [PTYSize](docs/PTYSize.md)
- [PauseSandboxResponse](docs/PauseSandboxResponse.md)
- [PodAffinity](docs/PodAffinity.md)
- [PodAffinityTerm](docs/PodAffinityTerm.md)
- [PodSpecOverride](docs/PodSpecOverride.md)
- [PoolStrategy](docs/PoolStrategy.md)
- [PortSpec](docs/PortSpec.md)
- [PreStopHook](docs/PreStopHook.md)
- [PreferredSchedulingTerm](docs/PreferredSchedulingTerm.md)
- [Probe](docs/Probe.md)
- [ProcessType](docs/ProcessType.md)
- [ProjectedHeader](docs/ProjectedHeader.md)
- [ProjectionSpec](docs/ProjectionSpec.md)
- [PublicGatewayAuth](docs/PublicGatewayAuth.md)
- [PublicGatewayCORS](docs/PublicGatewayCORS.md)
- [PublicGatewayConfig](docs/PublicGatewayConfig.md)
- [PublicGatewayRateLimit](docs/PublicGatewayRateLimit.md)
- [PublicGatewayRoute](docs/PublicGatewayRoute.md)
- [REPLConfig](docs/REPLConfig.md)
- [REPLEnvVar](docs/REPLEnvVar.md)
- [REPLPromptConfig](docs/REPLPromptConfig.md)
- [REPLReadyConfig](docs/REPLReadyConfig.md)
- [REPLReadyMode](docs/REPLReadyMode.md)
- [RefreshRequest](docs/RefreshRequest.md)
- [RefreshResponse](docs/RefreshResponse.md)
- [Region](docs/Region.md)
- [RegisterRequest](docs/RegisterRequest.md)
- [RegistryCredentials](docs/RegistryCredentials.md)
- [RegistryCredentialsRequest](docs/RegistryCredentialsRequest.md)
- [ResizeContextRequest](docs/ResizeContextRequest.md)
- [ResourceQuota](docs/ResourceQuota.md)
- [ResourceUsage](docs/ResourceUsage.md)
- [ResumeSandboxResponse](docs/ResumeSandboxResponse.md)
- [SSHPublicKey](docs/SSHPublicKey.md)
- [Sandbox](docs/Sandbox.md)
- [SandboxConfig](docs/SandboxConfig.md)
- [SandboxNetworkPolicy](docs/SandboxNetworkPolicy.md)
- [SandboxPowerState](docs/SandboxPowerState.md)
- [SandboxProbeSet](docs/SandboxProbeSet.md)
- [SandboxProbeSpec](docs/SandboxProbeSpec.md)
- [SandboxRefreshRequest](docs/SandboxRefreshRequest.md)
- [SandboxResourceUsage](docs/SandboxResourceUsage.md)
- [SandboxSSHConnection](docs/SandboxSSHConnection.md)
- [SandboxStatus](docs/SandboxStatus.md)
- [SandboxSummary](docs/SandboxSummary.md)
- [SandboxTemplate](docs/SandboxTemplate.md)
- [SandboxTemplateCondition](docs/SandboxTemplateCondition.md)
- [SandboxTemplateSpec](docs/SandboxTemplateSpec.md)
- [SandboxTemplateStatus](docs/SandboxTemplateStatus.md)
- [SandboxUpdateConfig](docs/SandboxUpdateConfig.md)
- [SandboxUpdateRequest](docs/SandboxUpdateRequest.md)
- [SandboxVolume](docs/SandboxVolume.md)
- [SecurityContext](docs/SecurityContext.md)
- [SignalContextRequest](docs/SignalContextRequest.md)
- [Snapshot](docs/Snapshot.md)
- [StaticHeadersSourceSpec](docs/StaticHeadersSourceSpec.md)
- [StaticTLSClientCertificateSourceSpec](docs/StaticTLSClientCertificateSourceSpec.md)
- [StaticUsernamePasswordSourceSpec](docs/StaticUsernamePasswordSourceSpec.md)
- [SuccessAPIKeyListResponse](docs/SuccessAPIKeyListResponse.md)
- [SuccessAPIKeyListResponseAllOfData](docs/SuccessAPIKeyListResponseAllOfData.md)
- [SuccessAuthProvidersResponse](docs/SuccessAuthProvidersResponse.md)
- [SuccessAuthProvidersResponseAllOfData](docs/SuccessAuthProvidersResponseAllOfData.md)
- [SuccessClaimResponse](docs/SuccessClaimResponse.md)
- [SuccessContextExecResponse](docs/SuccessContextExecResponse.md)
- [SuccessContextListResponse](docs/SuccessContextListResponse.md)
- [SuccessContextListResponseAllOfData](docs/SuccessContextListResponseAllOfData.md)
- [SuccessContextResponse](docs/SuccessContextResponse.md)
- [SuccessContextStatsResponse](docs/SuccessContextStatsResponse.md)
- [SuccessCreateAPIKeyResponse](docs/SuccessCreateAPIKeyResponse.md)
- [SuccessCreatedResponse](docs/SuccessCreatedResponse.md)
- [SuccessCreatedResponseAllOfData](docs/SuccessCreatedResponseAllOfData.md)
- [SuccessCredentialSourceListResponse](docs/SuccessCredentialSourceListResponse.md)
- [SuccessCredentialSourceResponse](docs/SuccessCredentialSourceResponse.md)
- [SuccessCurrentAPIKeyResponse](docs/SuccessCurrentAPIKeyResponse.md)
- [SuccessCurrentAPIKeyResponseAllOfData](docs/SuccessCurrentAPIKeyResponseAllOfData.md)
- [SuccessDeletedResponse](docs/SuccessDeletedResponse.md)
- [SuccessDeletedResponseAllOfData](docs/SuccessDeletedResponseAllOfData.md)
- [SuccessDeviceLoginPollResponse](docs/SuccessDeviceLoginPollResponse.md)
- [SuccessDeviceLoginStartResponse](docs/SuccessDeviceLoginStartResponse.md)
- [SuccessEnvelope](docs/SuccessEnvelope.md)
- [SuccessExposedPortsResponse](docs/SuccessExposedPortsResponse.md)
- [SuccessExposedPortsResponseAllOfData](docs/SuccessExposedPortsResponseAllOfData.md)
- [SuccessFileListResponse](docs/SuccessFileListResponse.md)
- [SuccessFileReadResponse](docs/SuccessFileReadResponse.md)
- [SuccessFileReadResponseAllOfData](docs/SuccessFileReadResponseAllOfData.md)
- [SuccessFileReadResponseAllOfDataOneOf](docs/SuccessFileReadResponseAllOfDataOneOf.md)
- [SuccessFileStatResponse](docs/SuccessFileStatResponse.md)
- [SuccessGatewayMetadataResponse](docs/SuccessGatewayMetadataResponse.md)
- [SuccessHealthResponse](docs/SuccessHealthResponse.md)
- [SuccessHealthResponseAllOfData](docs/SuccessHealthResponseAllOfData.md)
- [SuccessIdentityListResponse](docs/SuccessIdentityListResponse.md)
- [SuccessIdentityListResponseAllOfData](docs/SuccessIdentityListResponseAllOfData.md)
- [SuccessLoginResponse](docs/SuccessLoginResponse.md)
- [SuccessMessageResponse](docs/SuccessMessageResponse.md)
- [SuccessMessageResponseAllOfData](docs/SuccessMessageResponseAllOfData.md)
- [SuccessMovedResponse](docs/SuccessMovedResponse.md)
- [SuccessMovedResponseAllOfData](docs/SuccessMovedResponseAllOfData.md)
- [SuccessPauseSandboxResponse](docs/SuccessPauseSandboxResponse.md)
- [SuccessPublicGatewayResponse](docs/SuccessPublicGatewayResponse.md)
- [SuccessPublicGatewayResponseAllOfData](docs/SuccessPublicGatewayResponseAllOfData.md)
- [SuccessRefreshResponse](docs/SuccessRefreshResponse.md)
- [SuccessRegionListResponse](docs/SuccessRegionListResponse.md)
- [SuccessRegionListResponseAllOfData](docs/SuccessRegionListResponseAllOfData.md)
- [SuccessRegionResponse](docs/SuccessRegionResponse.md)
- [SuccessRegistryCredentialsResponse](docs/SuccessRegistryCredentialsResponse.md)
- [SuccessResizedResponse](docs/SuccessResizedResponse.md)
- [SuccessResizedResponseAllOfData](docs/SuccessResizedResponseAllOfData.md)
- [SuccessRestoreResponse](docs/SuccessRestoreResponse.md)
- [SuccessRestoreResponseAllOfData](docs/SuccessRestoreResponseAllOfData.md)
- [SuccessResumeSandboxResponse](docs/SuccessResumeSandboxResponse.md)
- [SuccessSSHPublicKeyListResponse](docs/SuccessSSHPublicKeyListResponse.md)
- [SuccessSSHPublicKeyListResponseAllOfData](docs/SuccessSSHPublicKeyListResponseAllOfData.md)
- [SuccessSSHPublicKeyResponse](docs/SuccessSSHPublicKeyResponse.md)
- [SuccessSandboxListResponse](docs/SuccessSandboxListResponse.md)
- [SuccessSandboxListResponseAllOfData](docs/SuccessSandboxListResponseAllOfData.md)
- [SuccessSandboxNetworkPolicyResponse](docs/SuccessSandboxNetworkPolicyResponse.md)
- [SuccessSandboxResponse](docs/SuccessSandboxResponse.md)
- [SuccessSandboxStatusResponse](docs/SuccessSandboxStatusResponse.md)
- [SuccessSandboxVolumeListResponse](docs/SuccessSandboxVolumeListResponse.md)
- [SuccessSandboxVolumeResponse](docs/SuccessSandboxVolumeResponse.md)
- [SuccessSignaledResponse](docs/SuccessSignaledResponse.md)
- [SuccessSignaledResponseAllOfData](docs/SuccessSignaledResponseAllOfData.md)
- [SuccessSnapshotListResponse](docs/SuccessSnapshotListResponse.md)
- [SuccessSnapshotResponse](docs/SuccessSnapshotResponse.md)
- [SuccessTeamListResponse](docs/SuccessTeamListResponse.md)
- [SuccessTeamListResponseAllOfData](docs/SuccessTeamListResponseAllOfData.md)
- [SuccessTeamMemberListResponse](docs/SuccessTeamMemberListResponse.md)
- [SuccessTeamMemberListResponseAllOfData](docs/SuccessTeamMemberListResponseAllOfData.md)
- [SuccessTeamMemberResponse](docs/SuccessTeamMemberResponse.md)
- [SuccessTeamResponse](docs/SuccessTeamResponse.md)
- [SuccessTemplateListResponse](docs/SuccessTemplateListResponse.md)
- [SuccessTemplateListResponseAllOfData](docs/SuccessTemplateListResponseAllOfData.md)
- [SuccessTemplateResponse](docs/SuccessTemplateResponse.md)
- [SuccessUserResponse](docs/SuccessUserResponse.md)
- [SuccessWrittenResponse](docs/SuccessWrittenResponse.md)
- [SuccessWrittenResponseAllOfData](docs/SuccessWrittenResponseAllOfData.md)
- [TCPSocketAction](docs/TCPSocketAction.md)
- [Team](docs/Team.md)
- [TeamMember](docs/TeamMember.md)
- [Template](docs/Template.md)
- [TemplateCreateRequest](docs/TemplateCreateRequest.md)
- [TemplateUpdateRequest](docs/TemplateUpdateRequest.md)
- [Toleration](docs/Toleration.md)
- [TrafficRule](docs/TrafficRule.md)
- [TrafficRuleAction](docs/TrafficRuleAction.md)
- [TrafficRuleAppProtocol](docs/TrafficRuleAppProtocol.md)
- [UpdateExposedPortsRequest](docs/UpdateExposedPortsRequest.md)
- [UpdateRegionRequest](docs/UpdateRegionRequest.md)
- [UpdateTeamMemberRequest](docs/UpdateTeamMemberRequest.md)
- [UpdateTeamRequest](docs/UpdateTeamRequest.md)
- [UpdateUserRequest](docs/UpdateUserRequest.md)
- [User](docs/User.md)
- [VolumeAccessMode](docs/VolumeAccessMode.md)
- [VolumeMountSpec](docs/VolumeMountSpec.md)
- [WarmProcessSpec](docs/WarmProcessSpec.md)
- [WebLoginExchangeRequest](docs/WebLoginExchangeRequest.md)
- [WebhookConfig](docs/WebhookConfig.md)
- [WeightedPodAffinityTerm](docs/WeightedPodAffinityTerm.md)

### Authorization


Authentication schemes defined for the API:
<a id="bearerAuth"></a>
#### bearerAuth


- **Type**: HTTP Bearer Token authentication (JWT)

## About

This TypeScript SDK client supports the [Fetch API](https://fetch.spec.whatwg.org/)
and is automatically generated by the
[OpenAPI Generator](https://openapi-generator.tech) project:

- API version: `0.1.0`
- Package version: `0.1.0`
- Generator version: `7.19.0`
- Build package: `org.openapitools.codegen.languages.TypeScriptFetchClientCodegen`

The generated npm module supports the following:

- Environments
  * Node.js
  * Webpack
  * Browserify
- Language levels
  * ES5 - you must have a Promises/A+ library installed
  * ES6
- Module systems
  * CommonJS
  * ES6 module system


## Development

### Building

To build the TypeScript source code, you need to have Node.js and npm installed.
After cloning the repository, navigate to the project directory and run:

```bash
npm install
npm run build
```

### Publishing

Once you've built the package, you can publish it to npm:

```bash
npm publish
```

## License

[]()
