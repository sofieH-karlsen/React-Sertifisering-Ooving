export default function Contact({ formData, setFormData }) {
    return (
        <>
           <label htmlFor="email">
                Email adress: 
                <input type="email" id="email" name="email" value={formData.email} onChange={e=> setFormData({...formData, email: e.target.value})} placeholder="Enter your email adress" required />
            </label> <br />
            <label htmlFor="phoneNumber">
                Phone Number: 
                <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={e=> setFormData({...formData, phoneNumber: e.target.value})} placeholder="Enter your phone number" required />
            </label>
        </>
    )
}