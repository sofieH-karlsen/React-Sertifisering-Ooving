export default function About({formData, setFormData}){
    return(
        <>
            <label htmlFor="about">
                About:
                <textarea id="about" name="about" cols="30" rows="10" value={formData.about} onChange={e=> setFormData({...formData,about:e.target.value})} placeholder="About yourself" required />
            </label>
        </>
    )
}