'use client'

import { useState, useRef } from 'react'

import f1 from "../../assets/f1.png"
import f2 from "../../assets/f2.png"
import f3 from "../../assets/f3.png"

const FRAME_ITEMS = [
  { id: 1, frameUrl: f1 },
  { id: 2, frameUrl: f2 },
  { id: 3, frameUrl: f3 },
  { id: 4, frameUrl: f1 },
  { id: 5, frameUrl: f2 },
  { id: 6, frameUrl: f3 },
]

export default function FrameCarousel() {
  const [backgroundPhoto, setBackgroundPhoto] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [uploadError, setUploadError] = useState('')

  const fileInputRef = useRef(null)

  /* ---------------- Upload Logic ---------------- */

  const handlePhotoUpload = (e) => {
    setUploadError('')
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Max file size is 10MB')
      return
    }

    const reader = new FileReader()
    reader.onload = () => setBackgroundPhoto(reader.result)
    reader.readAsDataURL(file)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleResetPhoto = () => {
    setBackgroundPhoto(null)
    setUploadError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  /* ---------------- Frame Controls ---------------- */

  const goPrev = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? FRAME_ITEMS.length - 1 : prev - 1
    )
  }

  const goNext = () => {
    setSelectedIndex((prev) =>
      prev === FRAME_ITEMS.length - 1 ? 0 : prev + 1
    )
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Frame Preview</h1>
          <p className="text-gray-600 mt-2">
            Upload your photo and switch frames using the controls
          </p>
        </div>

        {/* Upload */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 border">
          {!backgroundPhoto ? (
            <div className="text-center">
              <button
                onClick={handleUploadClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium"
              >
                Upload Photo
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Photo uploaded</span>
              <button
                onClick={handleResetPhoto}
                className="text-sm text-red-500"
              >
                Remove
              </button>
            </div>
          )}

          {uploadError && (
            <p className="text-red-500 text-sm mt-4">{uploadError}</p>
          )}
        </div>

        {/* Main Preview with Controls */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border">
          <div className="max-w-sm mx-auto relative">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-200 shadow-2xl">

              {backgroundPhoto && (
                <div className="absolute inset-10 bg-white rounded-lg overflow-hidden z-10">
                  <img
                    src={backgroundPhoto}
                    alt="Uploaded"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              <img
                src={FRAME_ITEMS[selectedIndex].frameUrl.src}
                alt="Frame"
                className="absolute inset-0 w-full h-full object-contain z-20"
              />

              {/* Controls */}
              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow"
              >
                ‹
              </button>

              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow"
              >
                ›
              </button>
            </div>

            <p className="text-center mt-6 text-sm text-gray-600">
              Frame {selectedIndex + 1} / {FRAME_ITEMS.length}
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
