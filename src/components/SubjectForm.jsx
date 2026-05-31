import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getSubject, createSubject, updateSubject } from '../api/subjectsApi';
import { OBJECT_CLASSES } from '../constants';
import { Loading, ErrorBlock } from './Loading';

const EMPTY = { item: '', class: 'Euclid', description: '', containment: '' };

export default function SubjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm]       = useState(EMPTY);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!isEdit) return;
    let cancelled = false;
    setLoading(true);
    getSubject(id).then(({ data, error }) => {
      if (cancelled) return;
      if (error) setError(error.message);
      else if (data) setForm({ item: data.item, class: data.class, description: data.description, containment: data.containment });
    }).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id, isEdit]);

  const set = (field, val) => setForm(prev => ({ ...prev, [field]: val }));

  const inputStyle = {
    width: '100%', background: '#0d0d0f', border: '1px solid #252535',
    borderRadius: '8px', padding: '10px 14px', fontSize: '14px',
    color: '#f0f0f5', fontFamily: 'inherit', outline: 'none',
    boxSizing: 'border-box', display: 'block'
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.item.trim() || !form.description.trim() || !form.containment.trim()) {
      setError('All fields are required.'); return;
    }
    setSaving(true); setError(null);
    try {
      if (isEdit) {
        const { error } = await updateSubject(id, form);
        if (error) throw error;
        navigate(`/subject/${id}`);
      } else {
        const { data, error } = await createSubject(form);
        if (error) throw error;
        navigate(`/subject/${data.id}`);
      }
    } catch (e) { setError(e.message); setSaving(false); }
  }

  if (loading) return <div style={{ maxWidth: '680px', margin: '0 auto', padding: '40px 24px' }}><Loading /></div>;

  return (
    <main style={{ maxWidth: '680px', margin: '0 auto', padding: '32px 24px' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#7070a0', marginBottom: '28px' }}>
        <Link to="/" style={{ color: '#7070a0', textDecoration: 'none' }}>Archive</Link>
        <span>/</span>
        {isEdit && <><Link to={`/subject/${id}`} style={{ color: '#7070a0', textDecoration: 'none' }}>{form.item}</Link><span>/</span></>}
        <span style={{ color: '#f0f0f5' }}>{isEdit ? 'Edit' : 'New Entry'}</span>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 600, color: '#f0f0f5', marginBottom: '6px' }}>
          {isEdit ? `Edit ${form.item}` : 'New SCP Entry'}
        </h1>
        <p style={{ fontSize: '13px', color: '#7070a0', margin: 0 }}>
          {isEdit ? 'Update the containment file details below.' : 'Fill in all fields to create a new containment record.'}
        </p>
      </div>

      {error && (
        <div style={{ background: 'rgba(192,57,43,0.08)', border: '1px solid rgba(192,57,43,0.3)', borderRadius: '8px', padding: '14px 16px', marginBottom: '20px' }}>
          <p style={{ fontSize: '13px', color: '#e74c3c', margin: 0 }}>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

        <div style={{ background: '#13131a', border: '1px solid #252535', borderRadius: '12px', padding: '24px' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#7070a0', textTransform: 'uppercase', letterSpacing: '0.08em', paddingBottom: '12px', borderBottom: '1px solid #252535', margin: '0 0 20px 0' }}>Basic Information</p>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#7070a0', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Item Designation</label>
            <input type="text" placeholder="SCP-XXXX" value={form.item} onChange={e => set('item', e.target.value)} required style={inputStyle} />
            <p style={{ fontSize: '11px', color: '#404060', margin: '6px 0 0 0' }}>Must be unique. Format: SCP-### or SCP-####</p>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#7070a0', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Object Class</label>
            <select value={form.class} onChange={e => set('class', e.target.value)} required style={{ ...inputStyle, cursor: 'pointer' }}>
              {OBJECT_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div style={{ background: '#13131a', border: '1px solid #252535', borderRadius: '12px', padding: '24px' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#7070a0', textTransform: 'uppercase', letterSpacing: '0.08em', paddingBottom: '12px', borderBottom: '1px solid #252535', margin: '0 0 20px 0' }}>Content</p>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#7070a0', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Description</label>
            <textarea rows={5} placeholder="Describe the anomalous properties..." value={form.description || ''} onChange={e => set('description', e.target.value)} required style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
            <p style={{ fontSize: '11px', color: '#404060', margin: '6px 0 0 0' }}>{(form.description || '').length} characters</p>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#7070a0', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Special Containment Procedures</label>
            <textarea rows={5} placeholder="Detail all containment requirements..." value={form.containment || ''} onChange={e => set('containment', e.target.value)} required style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
            <p style={{ fontSize: '11px', color: '#404060', margin: '6px 0 0 0' }}>{(form.containment || '').length} characters</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '8px' }}>
          <Link to={isEdit ? `/subject/${id}` : '/'} style={{ display: 'inline-flex', alignItems: 'center', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, background: 'transparent', color: '#7070a0', border: '1px solid #252535', textDecoration: 'none' }}>
            Cancel
          </Link>
          <button type="submit" disabled={saving} style={{ display: 'inline-flex', alignItems: 'center', padding: '10px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, background: '#c0392b', color: '#fff', border: '1px solid #c0392b', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Saving...' : isEdit ? '✓ Save Changes' : '✓ Create Entry'}
          </button>
        </div>

      </form>
    </main>
  );
}
