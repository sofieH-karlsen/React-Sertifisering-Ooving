export default function Person({ formData, setFormData }) {
    return (
        <>
            <label htmlFor="firstName">
                First Name: 
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={e=> setFormData({...formData, firstName: e.target.value})} placeholder="Enter your first name" required />
            </label>
            <br />
            <label htmlFor="lastName">
                Last Name: 
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={e=> setFormData({...formData, lastName: e.target.value})} placeholder="Enter your last name" required/>
            </label>
            <br/>
            <label htmlFor="gender">
                Gender: 
                <input defaultChecked type="radio" id="male" name="gender" value="male"  onChange={e=> setFormData({...formData, gender: e.target.value})} required /> Male
                <input type="radio" id="female" name="gender" value="female" onChange={e=> setFormData({...formData, gender: e.target.value})} /> Female
                <input type="radio" id="other" name="gender" value="other" onChange={e=> setFormData({...formData, gender: e.target.value})} /> Other
            </label>
        </>
    )
}