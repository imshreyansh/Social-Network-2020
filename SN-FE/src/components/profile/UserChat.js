import React, { Component } from 'react';
import { connect } from 'react-redux'
import './profile.css'
import { handleGetUserById } from '../../actions/user'
import { handleGetAllUsers, handleGetUserChat, handleSendUserChat } from '../../actions/userChat'
import jwtDecode from 'jwt-decode'
import { getItemFromStorage } from '../../utils/localStorage';
import Avatar from '@material-ui/core/Avatar';
import SendIcon from '@material-ui/icons/Send';
import io from 'socket.io-client'
let socket
const ENDPOINT = `http://localhost:5000`
class UserChat extends Component {
    constructor(props) {
        super(props)
        this.default = {
            input: '',
            receiver: '',
            userData: '',
            data: '',
            userChat: props.userChat,
        }

        this.state = this.default
        this.props.dispatch(handleGetUserById(this.props.id))
        this.props.dispatch(handleGetAllUsers())
    }

    componentWillReceiveProps({ userChat }) { //So basically i have added this piece of code because it will update the state whenever there will be a change in redux state

        this.setState({ userChat });
    }
    componentDidMount() {
        socket = io(ENDPOINT)
        socket.on('received', data => {
            this.setState({
                userChat: this.state.userChat.concat(data.sock.chat)

            })
        })

    }

    componentWillUnmount() {
        socket.emit('disconnect')
        socket.off()
    }

    onSelectUser = (id, userData) => {
        this.setState({
            receiver: id,
            userData
        }, () => {
            const obj = {
                sender: this.props.id,
                receiver: id
            }
            this.props.dispatch(handleGetUserChat(obj))
        })


    }

    sendUser = () => {

        const sock = {
            sender: this.props.id,
            receiver: this.state.receiver,
            chat: { user: this.props.userDetails, message: this.state.input }
        }

        const obj = {
            sender: this.props.id,
            receiver: this.state.receiver,
            chat: { user: this.props.id, message: this.state.input }
        }
        const obj2 = {
            sender: this.props.id,
            receiver: this.state.receiver
        }
        socket.emit('chat', { sock })
        this.props.dispatch(handleSendUserChat(obj, obj2))
        this.setState({
            input: ''
        })
    }

    render() {
        console.log(this.state.userChat, 'lnlnl')

        // const avatarPath = this.props.userDetails ? this.props.userDetails.avatar.path : ''
        return (
            <div className="userProfile">
                <div className="UsernameChat">
                    {this.props.allUsers.map((data, i) => {
                        const allAvatar = data.avatar.path

                        return (
                            <div key={i} className='userPhotoAndName' onClick={() => this.onSelectUser(data._id, data)}>
                                <Avatar style={{ width: '80px', height: '80px', marginTop: '20px', marginLeft: '20px' }} alt="Remy Sharp" src={`/${allAvatar}`} />
                                <div className='nameAndTimePost'>
                                    <span className='userPhotoAndNameUserComment'>{data.name}</span>
                                    <span className='userPhotoAndNameUserCommentTime' style={{ color: data.userStatus === 'Available' ? 'green' : 'red' }}>{data.userStatus}</span>
                                </div>

                            </div>

                        )
                    })}
                </div>
                {this.state.userData ? <div className='userChatDetails'>
                    <div className='chatHeadingDetails'>
                        <div className='userInChatDetails'>
                            <span className='usernameInChatDetails'>{this.state.userData.name}</span>
                        </div>
                    </div>
                    {this.state.userChat.map((data, i) => {
                        if (data.user._id === this.props.id) {
                            return (
                                <div key={i} className='userChatTextOne'>
                                    <Avatar style={{ width: '60px', height: '60px', marginTop: '20px', marginLeft: '20px' }} alt="Remy Sharp" src={`/${data.user.avatar.path}`} />
                                    <div className="userChatBoxText">
                                        <span className="userChatBoxTextInOne">{data.message}</span>
                                    </div>

                                </div>
                            )
                        } else {
                            return (
                                <div key={i} className='userChatTextTwo'>
                                    <div className="userChatBoxTextTwo">
                                        <span className="userChatBoxTextInTwo">{data.message}</span>

                                    </div>

                                    <Avatar style={{ width: '60px', height: '60px', marginTop: '20px', marginRight: '20px' }} alt="Remy Sharp" src={`/${data.user.avatar.path}`} />

                                </div>
                            )
                        }
                    })}


                    <div className="chatSend">
                        <input className="chatSendInput" type="email" value={this.state.input} onChange={(e) => this.setState({ input: e.target.value })} placeholder="Write your message" />
                        <SendIcon style={{ color: '#004d40', cursor: 'pointer', marginTop: '10px' }} onClick={() => this.sendUser()} />
                    </div>


                </div> : <div></div>}
            </div>
        )
    }
}

function mapStateToProps(login) {
    return {
        id: jwtDecode(getItemFromStorage('jwtToken')).id,
        userDetails: login.user,
        allUsers: login.userChat === null ? [] : login.userChat.allUsers.filter(user => user._id !== jwtDecode(getItemFromStorage('jwtToken')).id),
        userChat: login.userChat === null ? [] : login.userChat.userChat === undefined ? [] : login.userChat.userChat[0].chat
    }
}

export default connect(mapStateToProps)(UserChat)

