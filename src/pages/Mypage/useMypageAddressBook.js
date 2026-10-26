import { useRef, useState } from 'react'

const emptyAddress = () => ({ label: '', recipient: '', postcode: '', address: '', detail: '', phone: '', mobile: '', isDefault: true })

export default function useMypageAddressBook(pathname, navigate) {
  const [addresses, setAddresses] = useState([])
  const [draft, setDraft] = useState(emptyAddress)
  const [editingId, setEditingId] = useState(null)
  const isOpen = pathname === '/mypage/addresses/new'
  const nextId = useRef(1)
  const triggerRef = useRef(null)

  function add(event) {
    event?.preventDefault()
    triggerRef.current = document.activeElement
    setEditingId(null)
    setDraft({ ...emptyAddress(), isDefault: addresses.length === 0 })
    navigate('/mypage/addresses/new')
  }

  function edit(id) {
    const address = addresses.find(item => item.id === id)
    if (!address) return
    triggerRef.current = document.activeElement
    setEditingId(id)
    setDraft({ ...address })
    navigate('/mypage/addresses/new')
  }

  function close() {
    setEditingId(null)
    setDraft(emptyAddress())
    navigate('/mypage/addresses', true)
    window.requestAnimationFrame(() => {
      const target = triggerRef.current
      if (target?.isConnected && target !== document.body) target.focus()
      else document.querySelector('[data-name="배송지추가버튼"]')?.focus()
    })
  }

  function save() {
    const saved = Object.fromEntries(Object.entries(draft).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value]))
    saved.id = editingId ?? nextId.current++
    setAddresses(previous => {
      const updated = previous.map(item => saved.isDefault ? { ...item, isDefault: false } : item)
      return editingId === null ? [...updated, saved] : updated.map(item => item.id === editingId ? saved : item)
    })
    close()
  }

  function remove(id) {
    setAddresses(previous => {
      const deletedDefault = previous.find(item => item.id === id)?.isDefault
      const remaining = previous.filter(item => item.id !== id)
      return deletedDefault ? remaining.map((item, index) => ({ ...item, isDefault: index === 0 })) : remaining
    })
  }

  function change(name, value) {
    setDraft(previous => ({ ...previous, [name]: value }))
  }

  return { addresses, draft, editingId, isOpen, add, edit, close, save, remove, change }
}
