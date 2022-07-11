module.exports = class UserDto {
    email
    user_id
    isActivated
    role

    constructor(model) {
        this.user_id = model.user_id
        this.email = model.email
        this.isActivated = model.isActivated
        this.role = model.role
    }

}