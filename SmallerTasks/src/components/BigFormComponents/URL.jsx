export default function URL({formData, setFormData}){
    return(
        <>
            <label htmlFor="url">
                URL:
                <input type="url" id="url" name="url" value={formData.url} onChange={e=> setFormData({...formData,url:e.target.value})} placeholder="Enter URL" required />
            </label> 
        </>
    )
}