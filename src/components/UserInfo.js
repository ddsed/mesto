export default class UserInfo {
    constructor({ profileName, profileDescription, profileAvatar }) {
        this._profileName = document.querySelector(profileName);
        this._profileDescription = document.querySelector(profileDescription);
        this._profileAvatar = document.querySelector(profileAvatar);
    }

    getUserInfo() {
        const info = {
            profileName: this._profileName.textContent,
            profileDescription: this._profileDescription.textContent,
            profileAvatar: this._profileAvatar.src
        };
        return info;
    }

    _getAvatarInfo(data) {
        this._profileAvatar.src = data.avatar;
    }

    changeAvatarInfo(data) {
        this._getAvatarInfo(data);
    }

    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileDescription.textContent = data.about;
        this._getAvatarInfo(data);
    }
}