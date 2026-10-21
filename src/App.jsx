import { useEffect, useState } from "react";
import { getAll, add, update, remove } from "./participantService";
import "./App.css";

export default function App() {
const [list, setList] = useState([]);
const [form, setForm] = useState({ name: "", email: "", teamName: "" });
const [editId, setEditId] = useState(null);

const load = () => getAll().then(res => setList(res.data));
useEffect(() => { load(); }, []);

const save = async (e) => {
e.preventDefault();


if (editId) await update(editId, form);
else await add(form);

setForm({ name: "", email: "", teamName: "" });
setEditId(null);
load();


};

const edit = (p) => {
setForm({ name: p.name, email: p.email, teamName: p.teamName });
setEditId(p.id);
};

const del = async (id) => {
if (window.confirm("Delete participant?")) {
await remove(id);
load();
}
};

return ( <div className="container"> <h1>Hackathon Participants</h1>


  <form onSubmit={save}>
    <input placeholder="Name" value={form.name}
      onChange={e => setForm({...form, name: e.target.value})} required />

    <input placeholder="Email" type="email" value={form.email}
      onChange={e => setForm({...form, email: e.target.value})} required />

    <input placeholder="Team" value={form.teamName}
      onChange={e => setForm({...form, teamName: e.target.value})} required />

    <button>{editId ? "Update" : "Add"}</button>
    {editId && <button type="button" onClick={() => {
      setEditId(null);
      setForm({ name: "", email: "", teamName: "" });
    }}>Cancel</button>}
  </form>

  {list.map(p => (
    <div className="card" key={p.id}>
      <h3>{p.name}</h3>
      <p>{p.email} | {p.teamName}</p>
      <button onClick={() => edit(p)}>Edit</button>
      <button onClick={() => del(p.id)}>Delete</button>
    </div>
  ))}
</div>

);
}
