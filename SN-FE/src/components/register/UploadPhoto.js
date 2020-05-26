import React, { Component } from 'react';
import { connect } from 'react-redux'
import './register.css'
import edit from '../../assets/images/edit.png'
import user from '../../assets/images/user.jpeg'
import { handleUpdateUserDetails } from '../../actions/updateUserDetails'
import { CustomizedSnackbars } from '../../utils/CustomizedSnackbars'

class UploadPhoto extends Component {
    constructor(props) {
        super(props)
        this.default = {
            file: '',
            imagePreviewUrl: '',
            userId: '',
            message: 'Registered Successfully',
        }

        this.state = this.default
        this._handleImageChange = this._handleImageChange.bind(this);

    }

    componentDidMount() {
        this.setState({
            userId: this.props.login.registerUser._id
        })
    }


    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    onSubmit = () => {
        const formData = new FormData()
        formData.append('avatar', this.state.file)
        this.props.dispatch(handleUpdateUserDetails(this.state.userId, formData))
    }

    render() {
        return (
            <div className="register">
                {this.props.registerSuccess === true ? <CustomizedSnackbars message={this.state.message} />
                    : <div></div>}
                <div className="upperOne">
                    <span className="coronaTitle">CORONA NETWORK</span>
                </div>
                <div className="upperTwoImage">
                    <div className="imageUpload">
                        <div className="editHead">
                            <label for="file-input">
                                <img className="edit" src={edit} alt="Logo" />
                            </label>
                            <input id="file-input" type="file" onChange={this._handleImageChange} />
                        </div>
                        <img className="userImage" src={this.state.imagePreviewUrl !== '' ? this.state.imagePreviewUrl : user} alt="Logo" />

                    </div>
                    <div className="uploadTitle">
                        <span className="uploadTitleSpan">Upload Your Avatar</span>

                    </div>
                    <div className="uploadButton" onClick={() => this.onSubmit()}>
                        <span className="uploadButtonSpan">Upload</span>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(login) {
    return {
        login,
        registerSuccess: login.registerUser !== null ? true : false,
    }
}

export default connect(mapStateToProps)(UploadPhoto)