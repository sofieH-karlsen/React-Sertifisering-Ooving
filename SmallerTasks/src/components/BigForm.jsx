import { useState } from 'react';
import Fullname from './BigFormComponents/Person';
import Contact from './BigFormComponents/Contact';
import Subjects from './BigFormComponents/Subjects';
import URL from './BigFormComponents/URL';
import About from './BigFormComponents/About';

export default function BigForm() {
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        gender: 'male',
        subjects:{
            math: true,
            science: false,
            history: false
        },
        url:'',
        selectedOption: '',
        about: ''
    });
    
    const handleReset =() =>{
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            gender: 'male',
            subjects:{
                math: true,
                science: false,
                history: false
            },
            url:'',
            selectedOption: '',
            about: ''
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(JSON.stringify(formData,null,2));
        handleReset();
    }


    return (
        <div>
            <h1>Big Form Component</h1>
            <fieldset style={{border: 'none'}}>
                <form onSubmit={handleSubmit}>
                    <Fullname formData={formData} setFormData={setFormData} /> 
                    <br />
                    <Contact formData={formData} setFormData={setFormData} />
                    <br />
                   <Subjects formData={formData} setFormData={setFormData} />
                   <br />
                    <URL formData={formData} setFormData={setFormData} />
                    <br />
                    <About formData={formData} setFormData={setFormData} />
                    <br />
                   
                    <button type="button" onClick={handleReset}>
                        Reset
                    </button>
                    <button type="submit">
                        Submit
                    </button>

                </form>
            </fieldset>
        </div>
    )
}