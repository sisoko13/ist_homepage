"use client"

import { useEffect, useState } from "react"
import { BookOpen, Award, FileText, Plus, X } from "lucide-react"
import PublicationModal from "./publication-modal"

interface Publication {
  id: number
  type: string
  title: string
  authors: string
  venue: string
  year: string
  badge: string
  image?: string
  link?: string
}

export default function PublicationsSection() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [publications, setPublications] = useState<Publication[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("adminKey")
    const expires = localStorage.getItem("expiresAt")
    if (
      stored &&
      process.env.NEXT_PUBLIC_ADMIN_KEY &&
      stored === process.env.NEXT_PUBLIC_ADMIN_KEY &&
      expires &&
      Date.now() < parseInt(expires)
    ) {
      setIsAdmin(true)
    }
  }, [])

  useEffect(() => {
    fetch("http://localhost:5000/api/publications")
      .then((res) => res.json())
      .then((data) => setPublications(data))
      .catch((err) => console.error("논문 불러오기 실패", err))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    try {
      const res = await fetch("http://localhost:5000/api/publications", {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        alert("논문이 성공적으로 등록되었습니다.")
        setIsAddModalOpen(false)
        window.location.reload()
      } else {
        const result = await res.json()
        alert("등록 실패: " + result.message)
      }
    } catch (err) {
      console.error("등록 중 오류 발생", err)
      alert("서버 오류로 등록 실패")
    }
  }

  const tabs = [
    { id: "all", label: "All", icon: BookOpen },
    { id: "journal", label: "학술지", icon: FileText },
    { id: "conference", label: "Conference", icon: Award },
    { id: "project", label: "Project", icon: BookOpen },
  ]

  const filteredPublications =
    activeTab === "all" ? publications : publications.filter((pub) => pub.type === activeTab)

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "학술지": return "bg-blue-100 text-blue-800"
      case "국제학술지": return "bg-green-100 text-green-800"
      case "학회": return "bg-purple-100 text-purple-800"
      case "특허": return "bg-yellow-100 text-yellow-800"
      case "프로젝트": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Publications</h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            IST Lab에서 발표한 논문과 연구 성과를 소개합니다.
          </p>
        </div>

        {isAdmin && (
          <div className="mb-6 text-right">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors font-medium flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" /> 논문 등록
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8 bg-white rounded-lg p-2 shadow-lg max-w-2xl mx-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id ? "bg-blue-700 text-white" : "text-gray-600 hover:text-blue-700"
                }`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Publication List */}
        <div className="space-y-6">
          {filteredPublications.map((pub) => (
            <div
              key={pub.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => {
                setSelectedPublication(pub)
                setIsModalOpen(true)
              }}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium mr-3 ${getBadgeColor(pub.badge)}`}>
                      {pub.badge}
                    </span>
                    <span className="text-sm text-gray-500">{pub.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-700 mb-3">{pub.title}</h3>
                  <p className="text-gray-600 mb-2"><strong>저자:</strong> {pub.authors}</p>
                  <p className="text-gray-600"><strong>게재지:</strong> {pub.venue}</p>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                    자세히 보기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>

      {/* 자세히 보기 모달 */}
      <PublicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        publication={selectedPublication}
      />

      {/* 논문 등록 폼 모달 */}
      {isAdmin && isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold text-blue-700 mb-4">논문 등록</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input name="title" type="text" placeholder="논문 제목" required className="w-full border px-3 py-2 rounded" />
              <input name="authors" type="text" placeholder="저자" required className="w-full border px-3 py-2 rounded" />
              <input name="venue" type="text" placeholder="게재지" required className="w-full border px-3 py-2 rounded" />
              <input name="year" type="text" placeholder="출판 연도" required className="w-full border px-3 py-2 rounded" />
              <input name="link" type="url" placeholder="논문 링크" className="w-full border px-3 py-2 rounded" />
              <select name="type" required className="w-full border px-3 py-2 rounded">
                <option value="">유형 선택</option>
                <option value="journal">학술지</option>
                <option value="conference">학회</option>
                <option value="project">프로젝트</option>
              </select>
              <select name="badge" required className="w-full border px-3 py-2 rounded">
                <option value="">배지 선택</option>
                <option value="학술지">학술지</option>
                <option value="국제학술지">국제학술지</option>
                <option value="학회">학회</option>
                <option value="특허">특허</option>
                <option value="프로젝트">프로젝트</option>
              </select>
              <input name="image" type="file" accept="image/*" className="w-full" />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  취소
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">
                  등록
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}