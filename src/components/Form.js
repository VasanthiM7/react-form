import React, { useState } from 'react';
import './Form.css'

const Form = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [gender, setGender] = useState('');
    const [subject, setSubject] = useState([]);
    const [resume, setResume] = useState(null);
    const [url, setUrl] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [about, setAbout] = useState('');
    const [message, setMessage] = useState('');

    const handleSubjectChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSubject((prev) => [...prev, value]);
        } else {
            setSubject((prev) => prev.filter((sub) => sub !== value));
        }
    };
    
    const handleReset = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setContact('');
        setGender('');
        setSubject([]);
        setResume(null);
        setUrl('');
        setSelectedOption('default');
        setAbout('');
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('contact', contact);
        formData.append('gender', gender);
        subject.forEach(sub => formData.append('subject[]', sub));
        formData.append('url', url);
        formData.append('selectedOption', selectedOption);
        formData.append('about', about);
        if (resume) {
            formData.append('resume', resume);
        }
        try {
            await fetch('https://webhook.site/21362d64-0182-4d19-ac47-7f98f116a750', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  mode: 'no-cors',
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    contact,
                    gender,
                    subject,
                    url,
                    selectedOption,
                    about,
                    resume: resume ? resume.name : null,
                }),
            });

            
            setMessage('Form submitted successfully!');
            handleReset(); 
        } catch (error) {

            setMessage('Failed to submit form. Please try again.');
            console.error("Error:", error);
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Form in React</h1>
            <div className="form-container">
                <div className="form-Name">
                    <div className='form-name-first'>
                        <label htmlFor="firstname">First Name*
                            <input type='text' id="firstname" name="firstName" value={firstName} placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} required />
                        </label>
                    </div>
                    <div className='form-name-last'>
                        <label htmlFor="lastname">Last Name*
                            <input type='text' id="lastname" name="lastName" value={lastName} placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} required />
                        </label>
                    </div>
                </div>
                <div className='form-email'>
                    <label htmlFor="email">Enter Email*
                        <input type='email' id="email" name="email" value={email} placeholder='Enter Email' onChange={(e) => {setEmail(e.target.value)}} required />
                    </label>
                </div>
                <div className='form-contact'>
                    <label htmlFor="contact">Contact*
                        <input type='text' id="contact" name="contact" value={contact} placeholder='Enter Mobile Number' onChange={(e) => {setContact(e.target.value)}} />
                    </label>
                </div>
                <div className='form-gender'>
                    <label>Gender*
                        <input type='radio' name='gender' value='male' id="male"
                        checked={gender === "male"}
                        onChange={(e) => {setGender(e.target.value)}} />
                        <label htmlFor="male">Male</label>

                        <input type='radio' name='gender' value='female' id="female"
                        checked={gender === "female"} 
                        onChange={(e) => {setGender(e.target.value)}} />
                        <label htmlFor="female">Female</label>

                        <input type='radio' name='gender' value='other' id="other"
                        checked={gender === "other"}
                        onChange={(e) => {setGender(e.target.value)}}/>
                        <label htmlFor="other">Other</label>
                    </label>
                </div>
                <div className='form-subjects'>
                    <label>Your best Subject
                        <input type='checkbox' name='subject' value='english' id="english" checked={subject.includes('english')} onChange={handleSubjectChange}/>
                        <label htmlFor="english">English</label>
                        <input type='checkbox' name='subject' value='maths' id="maths" checked={subject.includes('maths')} onChange={handleSubjectChange} />
                        <label htmlFor="maths">Maths</label>
                        <input type='checkbox' name='subject' value='physics' id="physics" checked={subject.includes('physics')} onChange={handleSubjectChange} />
                        <label htmlFor="physics">Physics</label>
                    </label>
                </div>
                <div className='form-resume'>
                    <label htmlFor="resume">Upload Resume*
                        <input type='file' id="resume" name="resume" onChange={(e) => {setResume(e.target.files[0])}} placeholder='Enter upload File' required/>
                    </label>
                    {resume && <p>Selected File: {resume.name}</p>}
                </div>
                <div className='form-url'>
                    <label htmlFor="url">Url*
                        <input type='url' id="url" name="url" value={url} onChange={(e) => {setUrl(e.target.value)}} placeholder='Enter Url' required/>
                    </label>
                </div>
                <div className='form-choice'>
                    <label htmlFor="select">Select your choice</label>
                    <select
                    id="select"
                    name="select"
                    value={selectedOption}
                    onChange={(e) =>
                        setSelectedOption(
                            e.target.value
                        )
                    }
                    >
                    <option
                        value="default"
                    >
                        Select your Ans
                    </option>
                    <optgroup label="Beginers">
                        <option value="1">HTML</option>
                        <option value="2">CSS</option>
                        <option value="3">
                            JavaScript
                        </option>
                    </optgroup>
                    <optgroup label="Advance">
                        <option value="4">React</option>
                        <option value="5">Node</option>
                        <option value="6">
                            Express
                        </option>
                        <option value="t">
                            MongoDB
                        </option>
                    </optgroup>
                    </select>
                </div>
                <div className='form-about'>
                    <label htmlFor="about">About*
                        <textarea name='about' id="about" cols='30' rows='10' value={about} placeholder='About your self' onChange={(e) => {setAbout(e.target.value)}} required/>
                    </label>
                </div>
                <button
                type='button'
                onClick={handleReset}
                >Reset
                </button>
                <button
                type='submit'
                >Submit</button>

                {message && <p>{message}</p>}
            </div>

        </form>
    );
}

export default Form;
