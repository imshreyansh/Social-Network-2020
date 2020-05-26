import React, { Component } from 'react';
import { connect } from 'react-redux'
import './profile.css'
import { handleGetUserById } from '../../actions/user'
import jwtDecode from 'jwt-decode'
import { getItemFromStorage } from '../../utils/localStorage';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CancelIcon from '@material-ui/icons/Cancel';
import SendIcon from '@material-ui/icons/Send';
import Avatar from '@material-ui/core/Avatar';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Modal from '@material-ui/core/Modal';
import { handleGetPost, handlePost, handleAddComment, handleAddLike, handleRemoveLike } from '../../actions/userPost'
import { handleUpdateStatus } from '../../actions/updateUserDetails'

class NewsFeed extends Component {
    constructor(props) {
        super(props)
        this.default = {
            day: '',
            status: '',
            file: '',
            imagePreviewUrl: '',
            open: false,
            comment: '',
            comments: []
        }

        this.state = this.default
        this.props.dispatch(handleGetUserById(this.props.id))
        this._handleImageChange = this._handleImageChange.bind(this);
        this.props.dispatch(handleGetPost())

    }

    componentDidMount() {
        this.getTime()

        const data = {
            userStatus: 'Available'
        }


        this.props.dispatch(handleUpdateStatus(this.props.id, data))
        this.props.dispatch(handleGetUserById(this.props.id))

    }


    getTime = () => {

        const currentDate = JSON.parse(new Date().getHours())
        if (currentDate >= 4 && currentDate < 12) {
            this.setState({
                day: 'Good Morning'
            })
        } else if (currentDate >= 12 && currentDate < 16) {
            this.setState({
                day: 'Good Afternoon'
            })
        } else {
            this.setState({
                day: 'Good Evening'
            })
        }
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

    handleOpen = (d) => {
        this.setState({
            open: true,
            comments: d
        })
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    onSubmit = () => {
        const obj = {
            user: this.props.id,
            status: this.state.status
        }
        const formData = new FormData()
        formData.append('image', this.state.file)
        formData.append('data', JSON.stringify(obj))
        this.props.dispatch(handlePost(formData))
        this.setState({
            status: '',
            imagePreviewUrl: '',
            file: ''
        })
    }

    onComment = (i) => {
        const obj = {
            id: i,
            comment: {
                user: this.props.id,
                comment: this.state.comment
            }

        }

        this.props.dispatch(handleAddComment(obj))
        this.setState({
            comment: ''
        })
    }

    onLike = (i) => {
        const obj = {
            id: i,
            like: {
                user: this.props.id,

            }
        }
        this.props.dispatch(handleAddLike(obj))

    }

    onUnLike = (i, l) => {
        const obj = {
            id: i,
            like: {
                user: this.props.id
            }
        }
        this.props.dispatch(handleRemoveLike(obj))
    }

    render() {

        return (
            <div className='userDashboard'>
                <div className="userNameTitle">
                    <span className="textDay">{this.state.day} {this.props.userDetails ? this.props.userDetails.name : ''}</span>
                    <div className='newsFeed'>
                        <input className="statusInput" type='text' value={this.state.status} placeholder='Tell me what is on your mind' onChange={(e) => this.setState({ status: e.target.value })} />
                        <div className="imageBoxUpload">
                            {this.state.imagePreviewUrl !== '' ? <div>
                                <CancelIcon style={{ position: 'absolute', width: '15px', height: '15px', color: '#004d40', cursor: 'pointer' }} onClick={() => this.setState({ imagePreviewUrl: '', file: '' })} />
                                <img className="userAddImage" src={this.state.imagePreviewUrl} alt="Logo" />
                            </div> : <div></div>}


                            <label for="file-input">
                                <AddAPhotoIcon style={{ marginTop: '5px', paddingRight: '10px', color: '#004d40', cursor: 'pointer' }} />
                            </label>

                            <input id="file-input" type="file" onChange={this._handleImageChange} />

                        </div>
                        <div className="buttonOuterSend">
                            <div className="buttonBoxSend" style={{ backgroundColor: this.state.status !== '' || this.state.file !== '' ? '#00695c' : '#e0f2f1' }}>
                                <SendIcon style={{ color: 'white', cursor: 'pointer' }} onClick={() => this.onSubmit()} />
                            </div>

                        </div>
                        {this.props.userPost.map((data, i) => {
                            const isLike = data.like.filter((d) => d.user._id === this.props.id).length > 0 ? true : false
                            return (
                                <div key={i} className='userFeed'>
                                    <div className='photoAndName'>
                                        <Avatar style={{ width: '50px', height: '50px', marginTop: '20px', marginLeft: '20px' }} alt="Remy Sharp" src={`/${data.user.avatar.path}`} />
                                        <div className='nameAndTimePost'>
                                            <span className='userPostedName'>{data.user.name}</span>
                                            <span className='postTime'>{`${new Date(data.date).getDate()}/${new Date(data.date).getMonth() + 1}/${new Date(data.date).getFullYear()}`} {`${new Date(data.date).getHours()}:${new Date(data.date).getMinutes()}`}</span>
                                        </div>

                                    </div>
                                    <div className='statusDiv'>
                                        <div className='statusDivText'>
                                            <span className='statusText'>{data.status}</span>

                                        </div>
                                        {data.image ? <img resizeMode='stretch' className="userImageStatus" src={`/${data.image.path}`} alt="Logo" />
                                            : <div></div>}
                                        <div className="actionButtons">
                                            {isLike === true ? <FavoriteIcon style={{ paddingLeft: '20px', color: 'red', cursor: 'pointer' }} onClick={() => this.onUnLike(data._id)} /> : <FavoriteBorderIcon style={{ paddingLeft: '20px', color: '#004d40', cursor: 'pointer' }} onClick={() => this.onLike(data._id)} />}
                                            <ChatBubbleOutlineIcon style={{ paddingLeft: '20px', color: '#004d40', cursor: 'pointer' }} onClick={() => this.handleOpen(data.comment)} />
                                        </div>
                                    </div>
                                    <div className='commentUserBox'>
                                        <input className="commentUser" type='text' value={this.state.comment} placeholder='Write your comment' onChange={(e) => this.setState({ comment: e.target.value })} />
                                        <div style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                            <SendIcon style={{ color: 'grey', cursor: 'pointer', marginTop: '28px' }} onClick={() => this.onComment(data._id)} />

                                        </div>

                                    </div>

                                </div>

                            )
                        })}

                    </div>
                </div>

                <Modal
                    open={this.state.open}
                    onClose={() => this.handleClose()}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"

                >
                    <div className="modal">
                        <div className="modalInside">
                            <CancelIcon style={{ width: '25px', height: '25px', color: '#004d40', cursor: 'pointer', justifyContent: 'flex-end' }} onClick={() => this.handleClose()} />
                            {this.state.comments.map((d, index) => {
                                console.log(d.user)
                                return (
                                    <div className='photoAndNameComment'>
                                        <Avatar style={{ width: '50px', height: '50px', marginTop: '20px', marginLeft: '20px' }} alt="Remy Sharp" src={`/${d.user.avatar.path}`} />
                                        <div className='nameAndTimePost'>
                                            <span className='userComment'>{d.user.name}</span>
                                            <span className='userCommentTime'>{`${new Date(d.date).getDate()}/${new Date(d.date).getMonth() + 1}/${new Date(d.date).getFullYear()}`} {`${new Date(d.date).getHours()}:${new Date(d.date).getMinutes()}`}</span>
                                            <span className='userCommentTitle'>{d.comment}</span>
                                        </div>

                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(login) {
    return {
        id: jwtDecode(getItemFromStorage('jwtToken')).id,
        userDetails: login.user,
        userPost: login.userPost === null ? [] : login.userPost.reverse()
    }
}


export default connect(mapStateToProps)(NewsFeed)

