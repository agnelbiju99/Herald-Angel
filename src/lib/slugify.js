export function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export async function generateUniqueSlug(name, supabase) {
  const base = slugify(name)
  const { data } = await supabase
    .from('invitees')
    .select('slug')
    .like('slug', `${base}%`)
  
  if (!data || data.length === 0) return base
  
  const existing = data.map(r => r.slug)
  if (!existing.includes(base)) return base
  
  let i = 2
  while (existing.includes(`${base}-${i}`)) i++
  return `${base}-${i}`
}
