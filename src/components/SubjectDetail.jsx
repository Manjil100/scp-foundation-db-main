import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getSubject, deleteSubject } from '../api/subjectsApi';
import ClassBadge from './ClassBadge';
import { Loading, ErrorBlock } from './Loading';
import { SCP_IMAGES, FALLBACK_IMAGE } from '../constants';

export default function SubjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject]             = useState(null);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [deleting, setDeleting]           = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getSubject(id).then(({ data, error }) => {
      if (cancelled) return;
      if (error) setError(error.message);
      else setSubject(data);
    }).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  async function handleDelete() {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    setDeleting(true);
    try { await deleteSubject(id); navigate('/'); }
    catch (e) { setError(e.message); setDeleting(false); }
  }

  if (loading) return <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}><Loading /></div>;
  if (error)   return <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}><ErrorBlock message={error} /></div>;
  if (!subject) return null;

  const img = SCP_IMAGES[subject.item] || FALLBACK_IMAGE;
  const btn = { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', border: '1px solid transparent', textDecoration: 'none', whiteSpace: 'nowrap', fontFamily: 'inherit' };

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#7070a0', marginBottom: '28px' }}>
        <Link to="/" style={{ color: '#7070a0', textDecoration: 'none' }}>← Archive</Link>
        <span>/</span>
        <span style={{ color: '#f0f0f5' }}>{subject.item}</span>
      </div>

      <div style={{ background: '#13131a', border: '1px solid #252535', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px' }}>
        <div style={{ height: '300px', position: 'relative' }}>
          <img src={img} alt={subject.item} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => { e.target.src = FALLBACK_IMAGE; }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 20%, rgba(13,13,15,0.95) 100%)' }} />
          <div style={{ position: 'absolute', bottom: '24px', left: '28px', right: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <p style={{ fontSize: '11px', color: '#7070a0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Item designation</p>
              <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#d4a017', fontFamily: 'monospace', lineHeight: 1, margin: 0 }}>{subject.item}</h1>
            </div>
            <ClassBadge cls={subject.class} size="lg" />
          </div>
        </div>
        <div style={{ padding: '16px 28px', display: 'flex', gap: '32px', borderTop: '1px solid #252535', flexWrap: 'wrap' }}>
          {[
            ['Object class', subject.class],
            ['Logged', new Date(subject.created_at).toLocaleDateString('en-NZ', { dateStyle: 'medium' })],
            ['Modified', new Date(subject.updated_at).toLocaleDateString('en-NZ', { dateStyle: 'medium' })],
            ['Record ID', subject.id ? subject.id.slice(0,8).toUpperCase() + '…' : '—'],
          ].map(([label, value]) => (
            <div key={label}>
              <p style={{ fontSize: '10px', color: '#7070a0', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 4px 0' }}>{label}</p>
              <p style={{ fontSize: '13px', color: '#f0f0f5', fontFamily: 'monospace', margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#13131a', border: '1px solid #252535', borderRadius: '12px', padding: '24px 28px', marginBottom: '16px' }}>
        <p style={{ fontSize: '11px', fontWeight: 600, color: '#7070a0', textTransform: 'uppercase', letterSpacing: '0.08em', paddingBottom: '12px', borderBottom: '1px solid #252535', margin: '0 0 16px 0' }}>Description</p>
        <p style={{ fontSize: '14px', color: '#c8c8d8', lineHeight: 1.8, margin: 0 }}>{subject.description}</p>
      </div>

      <div style={{ background: '#13131a', border: '1px solid #252535', borderRadius: '12px', padding: '24px 28px', marginBottom: '28px' }}>
        <p style={{ fontSize: '11px', fontWeight: 600, color: '#7070a0', textTransform: 'uppercase', letterSpacing: '0.08em', paddingBottom: '12px', borderBottom: '1px solid #252535', margin: '0 0 16px 0' }}>Special Containment Procedures</p>
        <p style={{ fontSize: '14px', color: '#c8c8d8', lineHeight: 1.8, margin: 0 }}>{subject.containment}</p>
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid #252535' }}>
        <Link to={`/subject/${id}/edit`} style={{ ...btn, background: '#1a1a24', color: '#f0f0f5', borderColor: '#2f2f45' }}>✎ Edit Record</Link>
        <button onClick={handleDelete} disabled={deleting} style={{ ...btn, background: confirmDelete ? '#8b0000' : 'transparent', color: confirmDelete ? '#fff' : '#e74c3c', borderColor: confirmDelete ? '#8b0000' : '#3a1515' }}>
          {deleting ? 'Deleting...' : confirmDelete ? '⚠ Confirm Delete' : '✕ Delete Record'}
        </button>
        {confirmDelete && <button onClick={() => setConfirmDelete(false)} style={{ ...btn, background: 'transparent', color: '#7070a0', borderColor: '#252535' }}>Cancel</button>}
        <Link to="/" style={{ ...btn, background: 'transparent', color: '#7070a0', marginLeft: 'auto' }}>← Back to Archive</Link>
      </div>
    </main>
  );
}
