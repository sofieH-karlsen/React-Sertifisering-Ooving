export default function Subjects({formData, setFormData}){
    const handleCheckboxes = (sub) =>{
            setFormData({
                ...formData,
                subjects:{
                    ...formData.subjects,
                    [sub]: !formData.subjects[sub]
                }
            })
        }

    return(
        <>
            <label htmlFor="subjects">
                Subjects: 
                <input type="checkbox" id="math" name="subjects" checked={formData.subjects.math} onChange={()=>handleCheckboxes("math")} /> Math
                <input type="checkbox" id="science" name="subjects" checked={formData.subjects.science} onChange={()=> handleCheckboxes("science")} /> Science
                <input type="checkbox" id="history" name="subjects" checked={formData.subjects.history} onChange={()=>handleCheckboxes("history")} /> History
            </label>
            <br />
            <label htmlFor="select">
                Select your option: 
                <select id="select" name="select" value={formData.selectedOption} onChange={e=>setFormData({...formData, selectedOption: e.target.value})} required>
                    <option value="" disabled>Select your option</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="React">React</option>
                    <option value="Node">Node</option>
                    <option value="Express">Express</option>
                </select>
            </label>
        </>
    )
}