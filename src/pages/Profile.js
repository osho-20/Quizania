import React, { useState } from 'react'
import Header from '../components/HeaderProfile'
import photo from '../components/img/profile.jpeg'
import { InputText } from 'primereact/inputtext'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { app } from '../firebase'
import Swal from 'sweetalert2'
import { getAuth, sendEmailVerification, updateEmail, updateProfile } from 'firebase/auth'
const Profile = (props) => {
    const user = props.props;
    const storage = getStorage(app);
    const [email, setEmail] = useState(user.email);
    const [fullName, setName] = useState(user.displayName);
    const [error, setError] = useState('');
    const [edit, setEdit] = useState(1);
    const auth = getAuth();
    const [Photo, setPhoto] = useState(auth.currentUser.photoURL);
    const submit = async (e) => {
        e.preventDefault();
        if (email === '' || fullName === '') {
            setError('**Please fill all fields**');
            return;
        }
        setError('')
        if (edit === 1) {
            if (auth.currentUser.email !== email) {
                await updateEmail(auth.currentUser, email).then(() => {
                    console.log("email updated")
                }).catch((error) => {
                    console.log(error);
                    setError('Email already taken.');
                    return;
                });
                await sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log('sent');
                    })
            }
            await updateProfile(auth.currentUser, {
                displayName: fullName,
                photoURL: Photo,
            }).then(() => {
                Swal.fire(
                    'Hurray!!',
                    'Updated Successfully.',
                    'success'
                )
                setEmail(email);
                setName(fullName);
                return;
            }).catch((error) => {
                console.log(error);
            })
            // window.location.reload(false);
        }

    };
    const upload = (e) => {
        const imgref = ref(storage, auth.currentUser.uid);
        uploadBytes(imgref, e).then(() => {
            getDownloadURL(imgref).then((url) => {
                setPhoto(url);
            }).catch((err) => {
                console.log('error= ', err);
            });
        }).catch((err) => {
            console.log('error2= ', err);
        })
    };
    window.onbeforeunload = function () {
        window.setTimeout(function () {
            window.location = '/Quizania/user=' + auth.currentUser.displayName;
        }, 0);
        window.onbeforeunload = null;
    }
    return (
        <div >
            <Header p={auth.currentUser} />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="profile">
                    <form onSubmit={submit} className="profile-page">
                        <InputText
                            type='file'
                            accept='/image/*'
                            disabled={edit}
                            id="upload-image"
                            style={{ display: 'none' }}
                            onChange={(e1) => {
                                const file = e1.target.files[0];
                                upload(file);
                            }}
                        />
                        <label htmlFor="upload-image" id="photo-box">
                            <img src={Photo === null ? photo : Photo} alt={photo} id="profile-photo" />
                        </label>
                        <p className='heading'>Profile</p>
                        <div style={{ textAlign: 'left', margin: '10px' }}>
                            <label id="create-quiz-label" style={{ width: '220px' }}>Full Name</label>
                            <input id="edit" value={fullName} onChange={(e) => setName(e.target.value)} type="name" placeholder="xyz" disabled={edit} />
                        </div>
                        <div style={{ textAlign: 'left', margin: '10px' }}>
                            <label id="create-quiz-label" style={{ width: '220px' }}>Email</label>
                            <input id="edit" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="xyz@gmail.com" disabled={edit} />
                        </div>
                        {/* <div style={{ textAlign: 'left', margin: '10px' }}>
                        <label id="create-quiz-label" style={{ width: '220px' }}>Phone Number</label>
                        <input id="edit" value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" pattern="[0-9]{10}" placeholder="XXXXXXXXXX" disabled={edit} />
                    </div> */}
                        {/* <div style={{ textAlign: 'left', margin: '10px' }}>
                        <label id="create-quiz-label" style={{ width: '220px' }}>Password</label>
                        <input id="edit" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="******" disabled={edit} />
                    </div> */}
                        {
                            error !== '' ? <p>{error}</p> : <p></p>
                        }
                        {
                            edit === 1 ? <button id="login-button" type="submit" onClick={(e) => setEdit(0)}>Edit</button> : <button type="submit" id="login-button" onClick={(e) => setEdit(1)}> Save</button>
                        }
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Profile
