export default class UserInfo {
    constructor({ profileName, profileDescription }) {
        this._profileName = document.querySelector(profileName);
        this._profileDescription = document.querySelector(profileDescription);
    }

    getUserInfo() {
        const info = {
            profileName: this._profileName.textContent,
            profileDescription: this._profileDescription.textContent,
        };
        return info;
    }

    setUserInfo({ profileName, profileDescription }) {
        this._profileName.textContent = profileName;
        this._profileDescription.textContent = profileDescription;
    }
}