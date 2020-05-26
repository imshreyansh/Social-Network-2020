import React, { Component } from 'react';
import { validator } from '../../utils/helpers'
import './register.css'
import { handleRegister } from '../../actions/register'
import { handleLogin } from '../../actions/login'
import { connect } from 'react-redux'
import { CustomizedSnackbars } from '../../utils/CustomizedSnackbars'

class Register extends Component {
    constructor(props) {
        super(props)
        this.default = {
            val: 'Mr.',
            name: '',
            nameE: '',
            email: '',
            emailE: '',
            password: '',
            passwordE: '',
            alert: false,
            message: 'Avatar Added Successfully',
            messageLogin: 'Login Failed'

        }

        this.state = this.default
    }



    onClick = () => {
        const { name, nameE, email, emailE, password, passwordE } = this.state
        if (name && email && password && nameE === '' && emailE === '' && passwordE === '') {
            const obj = {
                gender: this.state.val === "Mr." ? "MALE" : "FEMALE",
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }
            this.props.dispatch(handleRegister(obj))
            this.setState({
                val: 'Mr.',
                name: '',
                email: '',
                password: '',
                title: false
            })
        } else if (name === '') {
            this.setState({
                nameE: 'Enter Name'
            })
        } else if (email === '') {
            this.setState({
                emailE: 'Enter Email'
            })
        } else if (password === '') {
            this.setState({
                passwordE: 'Enter Password'
            })
        }

    }


    onLogin = () => {
        const obj = {
            email: this.state.email,
            password: this.state.password
        }



        this.props.dispatch(handleLogin(obj))
    }

    render() {
        return (
            <div className="register">
                {this.props.avatarSuccess === true ? <CustomizedSnackbars message={this.state.message} type={'success'} />
                    : <div></div>}
                {this.props.error ? <CustomizedSnackbars message={this.props.error} type={'error'} />
                    : <div></div>}

                <div className="upperOne">
                    <span className="coronaTitle">CORONA NETWORK</span>
                    <span className="loginTitle" onClick={() => this.setState({ title: !this.state.title, name: '', email: '', password: '', nameE: '', emailE: '', passwordE: '' })}>{this.state.title ? "SIGNUP" : "LOGIN"}</span>
                </div>
                <div className="upperTwo">
                    {this.state.title ?
                        <div className="middleOne">
                            <div>
                                <img className="image" src="https://image.freepik.com/free-vector/man-wear-mask-clean-his-hand-with-hand-sanitizer_77628-304.jpg" alt="Logo" />
                                <span className="safe">STAY INN ! STAY SAFE !</span>
                            </div>
                            <span className="welcome">Welcome, login to your account</span>
                            <span className="welcomeTwo">Enter your email address and password</span>

                            <div className="firstRow">
                                <input className="email" type="email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} placeholder="Email" />
                                <input className="password" type="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} placeholder="Password" />
                            </div>
                            <div className="btnDir">
                                <div className="btn" onClick={() => this.onLogin()}><span className="btnText">Submit</span></div>
                            </div>
                        </div> :
                        <div className="middleOne">
                            <div>
                                <img className="image" src="https://image.freepik.com/free-vector/man-wear-mask-clean-his-hand-with-hand-sanitizer_77628-304.jpg" alt="Logo" />
                                <span className="safe">STAY INN ! STAY SAFE !</span>
                            </div>
                            <span className="welcome">Welcome, create your account</span>
                            <span className="welcomeTwo">Enter your email address and create a password</span>
                            <div className="firstRow">
                                <select className="select" onChange={(e) => this.setState({ val: e.target.value })}>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs./Miss">Mrs./Miss</option>
                                </select>
                                <input style={{ borderColor: this.state.nameE !== '' ? 'red' : '#ddd' }} className="name" type="text" value={this.state.name} onChange={(e) => this.setState(validator(e, 'name', 'text', [('Enter Name')]))} placeholder="Name" />
                            </div>
                            <div className="firstRow">
                                <input style={{ borderColor: this.state.emailE !== '' ? 'red' : '#ddd' }} className="email" type="email" value={this.state.email} onChange={(e) => this.setState(validator(e, 'email', 'email', [('Enter Email')]))} placeholder="Email" />
                                <input style={{ borderColor: this.state.passwordE !== '' ? 'red' : '#ddd' }} className="password" type="password" value={this.state.password} onChange={(e) => this.setState(validator(e, 'password', 'text', [('Enter Password')]))} placeholder="Password" />
                            </div>
                            <div className="btnDir">
                                <div className="btn" onClick={() => this.onClick()}><span className="btnText">Submit</span></div>
                            </div>
                        </div>}

                </div>

            </div>
        )
    }
}

function mapStateToProps(login) {
    return {
        error: login.error,
        registerSuccess: login.registerUser !== null ? true : false,
        avatarSuccess: login.updateUserDetails && login.updateUserDetails.updatedAvatar ? true : false,
        loginUser: login.login
    }
}

export default connect(mapStateToProps)(Register)