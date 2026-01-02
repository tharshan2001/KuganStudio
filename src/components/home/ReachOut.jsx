export default function ReachOut() {
  return (
    <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-1 ">
      {/* Header Section */}
      <div className="text-center mb-16">
        
        <h1 className="mt-8 text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
          We'd love to{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Hear From You
          </span>
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Or simply reach out manually to{' '}
          <a
            href="mailto:contact@prebuiltui.com"
            className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200 decoration-2 decoration-indigo-300 hover:decoration-indigo-500"
          >
            contact@prebuiltui.com
          </a>
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        {/* Email Support Card */}
        <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-100">
          <div className="absolute -top-4 left-8">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 4.125H3A1.125 1.125 0 0 0 1.875 5.25V18a1.875 1.875 0 0 0 1.875 1.875h16.5A1.875 1.875 0 0 0 22.125 18V5.25A1.125 1.125 0 0 0 21 4.125m-2.892 2.25L12 11.974 5.892 6.375zM4.125 17.625V7.808l7.115 6.522a1.125 1.125 0 0 0 1.52 0l7.115-6.522v9.817z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          
          <div className="pt-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Our dedicated team responds in real-time with expert solutions.
            </p>
            <a
              href="mailto:contact@prebuiltui.com"
              className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 group-hover:translate-x-2 transition-all duration-300"
            >
              contact@prebuiltui.com
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Office Visit Card */}
        <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-100">
          <div className="absolute -top-4 left-8">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.875 19.125H21.75V9.309a1.125 1.125 0 0 0-.375-2.184h-3.75V4.809a1.125 1.125 0 0 0-.375-2.184H3.75a1.125 1.125 0 0 0-.375 2.184v14.316H2.25a1.125 1.125 0 1 0 0 2.25h20.625a1.125 1.125 0 1 0 0-2.25M19.5 9.375v9.75h-1.875v-9.75zm-13.875-4.5h9.75v14.25h-1.5V15a1.125 1.125 0 0 0-1.125-1.125h-4.5A1.125 1.125 0 0 0 7.125 15v4.125h-1.5zm6 14.25h-2.25v-3h2.25zM6.75 7.5a1.125 1.125 0 0 1 1.125-1.125h.75a1.125 1.125 0 0 1 0 2.25h-.75A1.125 1.125 0 0 1 6.75 7.5m4.5 0a1.125 1.125 0 0 1 1.125-1.125h.75a1.125 1.125 0 0 1 0 2.25h-.75A1.125 1.125 0 0 1 11.25 7.5m-4.5 3.75a1.125 1.125 0 0 1 1.125-1.125h.75a1.125 1.125 0 1 1 0 2.25h-.75A1.125 1.125 0 0 1 6.75 11.25m4.5 0a1.125 1.125 0 0 1 1.125-1.125h.75a1.125 1.125 0 1 1 0 2.25h-.75a1.125 1.125 0 0 1-1.125-1.125"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          
          <div className="pt-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Our Office</h3>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Experience our vibrant workspace and meet the team in person.
            </p>
            <div className="inline-flex items-center text-indigo-600 font-semibold group-hover:translate-x-2 transition-all duration-300">
              221b Elementary Avenue, NY
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Phone Support Card */}
        <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-100">
          <div className="absolute -top-4 left-8">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m19 13.513-4.415-1.98-.017-.007a1.87 1.87 0 0 0-1.886.243l-2.091 1.781c-1.22-.66-2.478-1.91-3.14-3.113l1.787-2.125q.043-.051.08-.108a1.88 1.88 0 0 0 .148-1.782L7.488 2A1.88 1.88 0 0 0 5.539.89 5.65 5.65 0 0 0 .625 6.5c0 7.651 6.224 13.875 13.875 13.875a5.65 5.65 0 0 0 5.61-4.914A1.88 1.88 0 0 0 19 13.513m-4.5 4.612A11.64 11.64 0 0 1 2.875 6.5a3.4 3.4 0 0 1 2.67-3.332l1.764 3.938-1.796 2.14q-.044.051-.08.108a1.88 1.88 0 0 0-.12 1.841c.883 1.808 2.702 3.615 4.529 4.5a1.88 1.88 0 0 0 1.845-.136q.055-.036.105-.08l2.102-1.787 3.938 1.763a3.4 3.4 0 0 1-3.332 2.67"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          
          <div className="pt-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us Directly</h3>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Available during business hours for immediate assistance.
            </p>
            <a
              href="tel:+1234567789"
              className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 group-hover:translate-x-2 transition-all duration-300"
            >
              (+1) 234 - 4567 - 789
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-20 pt-8 border-t border-gray-200 text-center">
        <p className="text-gray-500 text-sm">
          Typically respond within <span className="font-semibold text-gray-700">2 hours</span> during business hours
        </p>
      </div>
    </div>
  );
}