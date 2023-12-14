export const axiosTypes = {
    LOGIN:'/Auth/Login',
    RECOVER_PASSWORD:'/Auth/RecoveryPassword',
    VALIDATE_COLLABORATOR:'/Auth/ValidateCollaborator',
    CHANGE_COLLABORATOR_PASSWORD:'/Auth/ChangeCollaboratorPassword',
    REFRESH_TOKEN:'/Auth/RefreshToken',
    GET_CODE:'/DynamicQr/Code/',
    VALIDATE_CODE: '/DynamicQr/Validate',
    CREATE_ACCESSLOCATION: '/AccessLocation/Create',
    GET_ACTIVES_ACCESSLOCATIONS:'/AccessLocation/Actives',
    SAVE_EXPO_TOKEN:'/Notifications/ExpoToken',
    GET_NOTIFICATIONS:'/Notifications/Collaborator',
    GET_BADGE_NOTIFY:'/Notifications/Badge',
    READ_NOTIFICATIONS:'/Notifications/Read',
    LOGOUT: '/Auth/Logout',
    CHANGE_EXPIRED_PASSWORD: '/Auth/ConfirmRecoveryPasswordCollaborator'
}