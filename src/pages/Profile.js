import React, { useState } from 'react'
import Header from '../components/Header'
import Photo from '../components/img/profile.jpeg'
import { InputText } from 'primereact/inputtext'
import { getAuth, sendEmailVerification, updateEmail } from 'firebase/auth'
const Profile = (props) => {
    const user = props.props;
    const no = '' + user.phoneNumber;
    const [email, setEmail] = useState(user.email);
    const [fullName, setName] = useState(user.displayName);
    const [pass, setPass] = useState('');
    const [phone, setPhone] = useState(no);
    const [error, setError] = useState('');
    const [edit, setEdit] = useState(1);
    const auth = getAuth();
    if (phone === "null") {
        setPhone('00000 00000');
    }

    const submit = (e) => {
        e.preventDefault();
        if (email === '' || fullName === '') {
            console.log(email, fullName);
            setError('**Please fill all fields**');
            return;
        }
        setError('')
        if (edit === 1) {
            console.log(auth.currentUser, email);
            if (auth.currentUser.email !== email) {
                updateEmail(auth.currentUser, email).then(() => {
                    console.log("email updated")
                }).catch((error) => {
                    console.log(error);
                    setError('Email already taken.');
                    return;
                });
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log('sent');
                    })
            }
            console.log(fullName, phone);
            auth.updateCurrentUser(auth.currentUser, {
                displayName: fullName,
                phoneNumber: phone.toString(),
                photoURL: Photo,
            }).then(() => {
                alert('Successfully Updated');
                setEmail(email);
                setName(fullName);
                return;
            }).catch((error) => {
                console.log(error);
            })
        }

    }
    return (
        <div>
            <Header />
            <div className="register">
                <form onSubmit={submit} className="register-page">
                    <img src={auth.currentUser.photoURL === null ? Photo : auth.currentUser.photoUR} />
                    <InputText
                        type='file'
                        accept='/image/*'
                        disabled={edit}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            console.log(file);
                        }}
                    />
                    <p className='heading'>Profile</p>
                    <label>Full Name</label>
                    <input value={fullName} onChange={(e) => setName(e.target.value)} type="name" placeholder="xyz" disabled={edit} />
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="xyz@gmail.com" disabled={edit} />
                    <label>Phone Number</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" pattern="[0-9]{10}" placeholder="XXXXXXXXXX" disabled={edit} />
                    <label>Password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="******" disabled={edit} />
                    {
                        error !== '' ? <p>{error}</p> : <p></p>
                    }
                    {
                        edit === 1 ? <button type="submit" onClick={(e) => setEdit(0)}>Edit</button> : <button type="submit" onClick={(e) => setEdit(1)}> Save</button>
                    }
                </form>
            </div>
        </div >
    )
}

export default Profile
