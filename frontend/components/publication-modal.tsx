"use client"

import { X } from "lucide-react"

interface PublicationItem {
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

interface PublicationModalProps {
  isOpen: boolean
  onClose: () => void
  publication: PublicationItem | null
}

export default function PublicationModal({ isOpen, onClose, publication }: PublicationModalProps) {
  if (!isOpen || !publication) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
          <div className="flex-1 pr-4">
            <div className="flex items-center mb-3">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium mr-3">
                {publication.badge}
              </span>
              <span className="text-sm text-gray-500">{publication.year}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{publication.title}</h2>
            <p className="text-sm text-gray-600">저자: {publication.authors}</p>
            <p className="text-sm text-gray-600 mt-1">게재지: {publication.venue}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {publication.image && (
            <div className="mb-6">
              <img
                src={publication.image}
                alt="논문 첫 페이지"
                className="w-full max-h-[500px] object-contain rounded shadow-lg"
              />
            </div>
          )}

          {publication.link && (
            <div className="text-center">
              <a
                href={publication.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                논문 보러가기
              </a>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 text-right">
          <button
            onClick={onClose}
            className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}
