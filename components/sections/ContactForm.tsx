'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Icon } from '../ui/Icons';
import { Product } from '../../lib/types';

interface ContactFormProps {
  products?: Product[];
  enquiryCategories?: { value: string; label: string }[];
}

export const ContactForm: React.FC<ContactFormProps> = ({
  products = [],
  enquiryCategories = [],
}) => {
  const searchParams = useSearchParams();
  const prefilledProduct = searchParams?.get('product') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    product: prefilledProduct || '',
    customProduct: '',
    estimatedQuantity: '',
    message: '',
    botcheck: '',
  });

  const [isCustomProduct, setIsCustomProduct] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');
  const [referenceId, setReferenceId] = useState<string | null>(null);

  // Floating Toast confirmation state
  const [toast, setToast] = useState<{
    show: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
    referenceId?: string;
  } | null>(null);

  // Automatically dismiss the toast after 6 seconds
  useEffect(() => {
    if (!toast?.show) return;
    const timer = setTimeout(() => {
      setToast((prev) => (prev ? { ...prev, show: false } : null));
    }, 6000);
    return () => clearTimeout(timer);
  }, [toast?.show]);

  useEffect(() => {
    if (prefilledProduct) {
      const match = products.find(
        (p) => p.name.toLowerCase() === prefilledProduct.toLowerCase()
      );
      if (match) {
        setIsCustomProduct(false);
        setFormData((prev) => ({ ...prev, product: match.name }));
      } else {
        setIsCustomProduct(true);
        setFormData((prev) => ({
          ...prev,
          customProduct: prefilledProduct,
          product: '',
        }));
      }
    }
  }, [prefilledProduct, products]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const finalProduct = isCustomProduct
      ? formData.customProduct.trim() || 'Custom / Unlisted Product'
      : formData.product;

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      '2d4de260-acb9-40a0-b378-79644dc7f8d2';


    const generatedRef = `LA-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;

    const web3Payload = {
      access_key: accessKey,
      subject: `New Commercial RFQ: ${finalProduct || 'General Sourcing'} - ${formData.fullName.trim()} [${generatedRef}]`,
      from_name: 'Lixbor Auron Trade Desk',
      name: formData.fullName.trim(),
      email: formData.email.trim(),
      'Reference ID': generatedRef,
      'Product Interested In': finalProduct || 'General Commodity Sourcing',
      'Country': formData.country.trim(),
      'Estimated Quantity': formData.estimatedQuantity.trim() || 'Not specified',
      'Message': formData.message.trim(),
      ...(formData.botcheck ? { botcheck: formData.botcheck } : {}),
    };

    try {
      let isSuccess = false;
      let statusMsg = '';

      // 1. Direct Web3Forms submission from the browser
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(web3Payload),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          isSuccess = true;
          statusMsg =
            data.message ||
            'Your quote request has been dispatched to our trade desk via Web3Forms.';
        } else {
          statusMsg = data.message || 'Submission failed via Web3Forms.';
        }
      } catch (browserFetchError) {
        console.error('Direct Web3Forms submission error:', browserFetchError);
        statusMsg = 'Network error while submitting. Please check your connection or email info@lixborauron.com directly.';
      }

      if (isSuccess) {
        setSubmitStatus('success');
        setResponseMessage(
          'Thank you! Your quote request has been received. Our trade desk will get in touch shortly.'
        );
        setReferenceId(generatedRef);
        setFormData({
          fullName: '',
          email: '',
          country: '',
          product: '',
          customProduct: '',
          estimatedQuantity: '',
          message: '',
          botcheck: '',
        });
        setIsCustomProduct(false);

        // Display rich floating Toast confirmation
        setToast({
          show: true,
          type: 'success',
          title: 'Quote Request Sent Successfully!',
          message: `Thank you, ${formData.fullName.trim()}. Your inquiry has been sent to our trade desk via Web3Forms.`,
          referenceId: generatedRef,
        });
      } else {
        setSubmitStatus('error');
        setResponseMessage(statusMsg || 'Something went wrong. Please try again later.');

        setToast({
          show: true,
          type: 'error',
          title: 'Submission Unsuccessful',
          message: statusMsg || 'Unable to submit your quote request. Please try again.',
        });
      }
    } catch {
      const netErrorMsg = 'Network error. Please check your connection and try again.';
      setSubmitStatus('error');
      setResponseMessage(netErrorMsg);
      setToast({
        show: true,
        type: 'error',
        title: 'Connection Error',
        message: netErrorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <>
      {/* Floating Toast Notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed top-5 right-5 sm:top-6 sm:right-6 z-[9999] max-w-md w-[calc(100%-2.5rem)] transition-all duration-300 ease-out transform pointer-events-auto ${
            toast.show
              ? 'translate-y-0 opacity-100 scale-100'
              : '-translate-y-4 opacity-0 pointer-events-none scale-95'
          }`}
        >
          <div
            className={`rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl border flex items-start gap-3.5 sm:gap-4 ${
              toast.type === 'success'
                ? 'bg-slate-900/95 text-white border-emerald-500/50 shadow-emerald-950/40'
                : 'bg-slate-900/95 text-white border-red-500/50 shadow-red-950/40'
            }`}
          >
            <div
              className={`p-2 rounded-xl shrink-0 flex items-center justify-center ${
                toast.type === 'success'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}
            >
              <Icon
                name={toast.type === 'success' ? 'CheckCircle2' : 'X'}
                size={22}
                className={toast.type === 'success' ? 'text-emerald-400' : 'text-red-400'}
              />
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <h4 className="text-sm font-bold text-white tracking-tight">{toast.title}</h4>
              <p className="mt-1 text-xs text-slate-300 font-light leading-relaxed">{toast.message}</p>
              {toast.referenceId && (
                <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-md w-fit">
                  <span className="text-slate-400">REF:</span>
                  <span className="font-semibold tracking-wide">{toast.referenceId}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setToast((prev) => (prev ? { ...prev, show: false } : null))}
              className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10 shrink-0 cursor-pointer"
              aria-label="Close notification"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xl">
        <div className="space-y-2 mb-8">
          <h3 className="text-2xl font-bold text-slate-900">Get Quote Inquiry Form</h3>
          <p className="text-sm text-slate-600 font-light">
            Submit your product interested in, target volume, or trade specifications to receive a commercial quote.
          </p>
        </div>


      {/* Submission Success Alert */}
      {submitStatus === 'success' && (
        <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-4 flex items-start gap-3">
          <Icon name="CheckCircle2" size={20} className="text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <h4 className="font-bold">Quote Request Submitted</h4>
            <p className="mt-1 font-light">{responseMessage}</p>
            {referenceId && (
              <p className="mt-2 font-mono text-xs text-emerald-800 bg-emerald-100/70 inline-block px-2.5 py-1 rounded-md border border-emerald-200">
                Reference ID: <span className="font-bold">{referenceId}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Submission Error Alert */}
      {submitStatus === 'error' && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 flex items-start gap-3">
          <Icon name="X" size={20} className="text-red-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <h4 className="font-bold">Submission Failed</h4>
            <p className="mt-1 font-light">{responseMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Anti-spam Honeypot field for Web3Forms (hidden from users) */}
        <input
          type="checkbox"
          name="botcheck"
          id="botcheck"
          className="hidden"
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
          checked={!!formData.botcheck}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              botcheck: e.target.checked ? 'true' : '',
            }))
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name* */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Full Name <span className="text-emerald-600">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              className={`w-full rounded-lg border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-slate-300 bg-slate-50/50'
              }`}
            />
            {errors.fullName && <p className="text-xs text-red-500 font-medium">{errors.fullName}</p>}
          </div>

          {/* Email* */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Email <span className="text-emerald-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. john@company.com"
              className={`w-full rounded-lg border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                errors.email ? 'border-red-500 bg-red-50/20' : 'border-slate-300 bg-slate-50/50'
              }`}
            />
            {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Country* */}
          <div className="space-y-2">
            <label htmlFor="country" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Country <span className="text-emerald-600">*</span>
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="e.g. India / United Arab Emirates"
              className={`w-full rounded-lg border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                errors.country ? 'border-red-500 bg-red-50/20' : 'border-slate-300 bg-slate-50/50'
              }`}
            />
            {errors.country && <p className="text-xs text-red-500 font-medium">{errors.country}</p>}
          </div>

          {/* Product Interested In (Driven by Sanity Studio) */}
          <div className="space-y-2">
            <label htmlFor="product" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Product Interested In
            </label>
            {products.length > 0 || enquiryCategories.length > 0 ? (
              <>
                <select
                  id="product"
                  name="product"
                  value={isCustomProduct ? '__custom__' : formData.product}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '__custom__') {
                      setIsCustomProduct(true);
                      setFormData((prev) => ({ ...prev, product: '' }));
                    } else {
                      setIsCustomProduct(false);
                      setFormData((prev) => ({ ...prev, product: val, customProduct: '' }));
                    }
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
                >
                  <option value="">Select a Product or Inquiry Category...</option>

                  {products.length > 0 && (
                    <optgroup label="Products & Commodities (from Catalog)">
                      {products.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    </optgroup>
                  )}

                  {enquiryCategories.length > 0 && (
                    <optgroup label="General Inquiry Categories">
                      {enquiryCategories.map((c) => (
                        <option key={c.value} value={c.label}>
                          {c.label}
                        </option>
                      ))}
                    </optgroup>
                  )}

                  <option value="__custom__">+ Other / Unlisted Product or Custom Grade</option>
                </select>

                {isCustomProduct && (
                  <input
                    type="text"
                    id="customProduct"
                    name="customProduct"
                    value={formData.customProduct}
                    onChange={handleChange}
                    placeholder="Enter custom product name or specifications..."
                    className="w-full rounded-lg border border-emerald-400 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all animate-fadeIn"
                    autoFocus
                  />
                )}
              </>
            ) : (
              <input
                type="text"
                id="product"
                name="product"
                value={formData.product}
                onChange={handleChange}
                placeholder="e.g. Magnesium Oxide (MgO) / XLPE / Urea"
                className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            )}
          </div>
        </div>

        {/* Estimated Quantity */}
        <div className="space-y-2">
          <label htmlFor="estimatedQuantity" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Estimated Quantity
          </label>
          <input
            type="text"
            id="estimatedQuantity"
            name="estimatedQuantity"
            value={formData.estimatedQuantity}
            onChange={handleChange}
            placeholder="e.g. 500 MT / Full Container Load (FCL)"
            className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>

        {/* Message* */}
        <div className="space-y-2">
          <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Message <span className="text-emerald-600">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Please detail your target specifications, packaging preferences, or port of destination..."
            className={`w-full rounded-lg border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
              errors.message ? 'border-red-500 bg-red-50/20' : 'border-slate-300 bg-slate-50/50'
            }`}
          />
          {errors.message && <p className="text-xs text-red-500 font-medium">{errors.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-veritase-outline !bg-emerald-600 hover:!bg-emerald-700 !border-emerald-600 justify-center text-xs py-4 disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2 text-white">
              <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
              <span>Submitting Quote Request...</span>
            </span>
          ) : (
            <span className="flex items-center gap-2 text-white font-bold">
              <span>GET QUOTE</span>
              <Icon name="ArrowRight" size={16} />
            </span>
          )}
        </button>
      </form>
    </div>
    </>
  );
};

