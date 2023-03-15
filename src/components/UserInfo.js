export default class UserInfo {
    constructor({ profileName, profileDescription }) {
        this._profileName = document.querySelector(profileName);
        this._profileDescription = document.querySelector(profileDescription);
    }

    getUserInfo() {
        const info = {
            profileName: this._profileName.textContent,
            profileDescription: this._profileDescription.textContent
        };
        return info;
    }

    setUserInfo(formData) {
        this._profileName.textContent = formData.name;
        this._profileDescription.textContent = formData.about;
    }
}