import React, { Component } from 'react';
import { connect } from 'react-redux'
import './userDashboard.css'
import { withRouter } from 'react-router-dom'
import { logout } from '../../actions/login'
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu'
import jwtDecode from 'jwt-decode'
import { Link } from 'react-router-dom'
import { getItemFromStorage } from '../../utils/localStorage';
import { handleGetUserById } from '../../actions/user'
import { handleUpdateStatus } from '../../actions/updateUserDetails'

class UserDashboard extends Component {
    constructor(props) {
        super(props)
        this.default = {
            anchorEl: null,
            avatarPath: ''

        }

        this.state = this.default
        this.props.dispatch(handleGetUserById(this.props.id))

    }



    onLogout = () => {
        this.props.history.push('/')
        this.props.dispatch(logout())

        const data = {
            userStatus: 'Unavailable'
        }



        this.props.dispatch(handleUpdateStatus(this.props.id, data))
    }



    render() {
        const avatarPath = this.props.userDetails ? this.props.userDetails.avatar.path : ''
        const handleClick = (event) => {
            this.setState({
                anchorEl: event.currentTarget
            })

        };

        const handleClose = () => {
            this.setState({
                anchorEl: null
            })

        };
        return (
            <div className="userDashboard">
                <div className="menuBar">
                    <div className="menuItems">
                        <span className="titleMenu">Corona Network</span>

                        <div className="avatarMenuMain">
                            <Link className="menuOption" style={{ textDecoration: 'none' }} to="/" ><span >HOME</span></Link>
                            <div className="avatarMenu">
                                <Avatar style={{ width: '50px', height: '50px', right: '30px' }} alt="Remy Sharp" src={`/${avatarPath}`} />
                                <IconButton
                                    aria-label="more"
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    onClick={(e) => handleClick(e)}

                                >
                                    <MenuIcon style={{ color: 'white', width: '30px', height: '30px' }} />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={this.state.anchorEl}
                                    keepMounted
                                    open={Boolean(this.state.anchorEl)}
                                    onClose={() => handleClose()}
                                >
                                    <Link style={{ textDecoration: 'none', color: '#333' }} to={`/chat${this.props.id}`}><MenuItem onClick={() => handleClose()}>My Online Buddies</MenuItem></Link>
                                    <MenuItem onClick={() => this.onLogout()}>Logout</MenuItem>
                                </Menu>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(login) {
    return {
        id: jwtDecode(getItemFromStorage('jwtToken')).id,
        userDetails: login.user
    }
}

export default (connect(mapStateToProps)(withRouter(UserDashboard)))

