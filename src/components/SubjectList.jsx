import { useState } from 'react';
import { useSubjects } from '../hooks/useSubjects';
import { OBJECT_CLASSES } from '../constants';
import SubjectCard from './SubjectCard';
import { Loading, ErrorBlock, Empty } from './Loading';

export default function SubjectList() {
  const { subjects, loading, error } = useSubjects();
  const [search, setSearch]       = useState('');
  const [classFilter, setClass]   = useState('');

  const filtered = subjects.filter(s => {
    const matchSearch = !search ||
      s.item.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    const matchClass = !classFilter || s.class === classFilter;
    return matchSearch && matchClass;
  });

  const inputStyle = {
    background: '#13131a', border: '1px solid #252535', borderRadius: '8px',
    padding: '10px 14px', fontSize: '13px', color: '#f0f0f5',
    fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
  };

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>

      <div style={{ marginBottom: '28px' }}>
        <p style={{ fontSize: '11px', fontWeight: 600, color: '#7070a0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Foundation Archive</p>
        <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#f0f0f5', marginBottom: '4px' }}>SCP Subject Database</h1>
        <p style={{ fontSize: '13px', color: '#7070a0', margin: 0 }}>
          {loading ? 'Loading records...' : `${filtered.length} of ${subjects.length} record${subjects.length !== 1 ? 's' : ''} shown`}
          {classFilter ? ` · Class: ${classFilter}` : ''}
          {search ? ` · "${search}"` : ''}
        </p>
      </div>

      {/* Search + filter */}
      <div style={{ background: '#13131a', border: '1px solid #252535', borderRadius: '12px', padding: '16px', marginBottom: '24px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by designation or description..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ ...inputStyle, flex: 1, minWidth: '200px' }}
        />
        <select
          value={classFilter}
          onChange={e => setClass(e.target.value)}
          style={{ ...inputStyle, width: '160px', cursor: 'pointer' }}
        >
          <option value="">All Classes</option>
          {OBJECT_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {(search || classFilter) && (
          <button
            onClick={() => { setSearch(''); setClass(''); }}
            style={{ ...inputStyle, width: 'auto', cursor: 'pointer', color: '#7070a0', padding: '10px 16px' }}
          >
            Clear
          </button>
        )}
      </div>

      {loading && <Loading />}
      {error    && <ErrorBlock message={error} />}
      {!loading && !error && filtered.length === 0 && <Empty message={subjects.length > 0 ? 'No records match your search.' : 'No records found.'} />}
      {!loading && !error && filtered.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
          {filtered.map(s => <SubjectCard key={s.id} subject={s} />)}
        </div>
      )}
    </main>
  );
}
