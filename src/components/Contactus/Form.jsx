import React, { useState } from 'react';
import { Snackbar, Alert, CircularProgress } from '@mui/material';

// Country codes for the contact number. India is the default; the GCC markets
// SST serves follow. len is the national number length (no trunk 0); group is how
// the digits are spaced while typing; start, when set, is the required first digit.
const DIAL_CODES = [
  { code: '+91', name: 'India', len: 10, group: [5, 5], start: /^[6-9]/ },
  { code: '+966', name: 'Saudi Arabia', len: 9, group: [2, 3, 4] },
  { code: '+971', name: 'UAE', len: 9, group: [2, 3, 4] },
  { code: '+974', name: 'Qatar', len: 8, group: [4, 4] },
  { code: '+965', name: 'Kuwait', len: 8, group: [4, 4] },
  { code: '+968', name: 'Oman', len: 8, group: [4, 4] },
  { code: '+973', name: 'Bahrain', len: 8, group: [4, 4] },
  { code: '+1', name: 'USA / Canada', len: 10, group: [3, 3, 4] },
  { code: '+44', name: 'United Kingdom', len: 10, group: [4, 6] },
  { code: '+65', name: 'Singapore', len: 8, group: [4, 4] },
];
const dialFor = (code) => DIAL_CODES.find((d) => d.code === code) || DIAL_CODES[0];

// The national digits inside whatever was typed or pasted for the chosen country:
// drops a pasted country code ("+91 ..." or "91..." when too long) and a leading
// trunk 0, then keeps at most the country's length.
const localDigits = (raw, dial) => {
  const cc = dial.code.slice(1);
  const plusCode = new RegExp(String.raw`^\s*\+\s*` + cc);
  const hasPlusCode = plusCode.test(raw);
  let digits = (hasPlusCode ? raw.replace(plusCode, '') : raw).replace(/\D/g, '');
  if (!hasPlusCode && digits.length > dial.len && digits.startsWith(cc)) digits = digits.slice(cc.length);
  if (digits.length > dial.len && digits.startsWith('0')) digits = digits.slice(1);
  return digits.slice(0, dial.len);
};

// Spaces the digits by the country's grouping while typing (India: "98765 43210").
const formatLocal = (raw, dial) => {
  const digits = localDigits(raw, dial);
  const parts = [];
  let i = 0;
  for (const size of dial.group) {
    if (i >= digits.length) break;
    parts.push(digits.slice(i, i + size));
    i += size;
  }
  return parts.join(' ');
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    companyEmail: '',
    contactNumber: '',
    country: '',
    companyName: '',
    enquiries: ''
  });

  const [dialCode, setDialCode] = useState(DIAL_CODES[0].code);
  const dial = dialFor(dialCode);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // MUI Snackbar states
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' // 'success', 'error', 'warning', 'info'
  });

  // Handle notification close
  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 3) {
      newErrors.firstName = 'First name must be at least 3 characters long';
    } else if (!/^[A-Za-z][A-Za-z\s'.-]*$/.test(formData.firstName.trim())) {
      newErrors.firstName = 'First name can only contain letters, spaces, apostrophes, hyphens and dots';
    }

    if (!formData.secondName.trim()) {
      newErrors.secondName = 'Last name is required';
    } else if (formData.secondName.trim().length < 1) {
      newErrors.secondName = 'Last name must be at least 1 characters long';
    } else if (!/^[A-Za-z][A-Za-z\s'.-]*$/.test(formData.secondName.trim())) {
      newErrors.secondName = 'Last name can only contain letters, spaces, apostrophes, hyphens and dots';
    }

    if (!formData.companyEmail.trim()) {
      newErrors.companyEmail = 'Company email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail.trim())) {
      newErrors.companyEmail = 'Please enter a valid email address';
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required'
    } else {
      // Length per country; India also needs a mobile number (starts 6-9)
      const local = localDigits(formData.contactNumber, dial)
      if (local.length !== dial.len) {
        newErrors.contactNumber = `Contact number must be ${dial.len} digits for ${dial.name}`
      } else if (dial.start && !dial.start.test(local)) {
        newErrors.contactNumber = `Please enter a valid ${dial.name} mobile number`
      }
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    } else if (formData.country.trim().length < 2) {
      newErrors.country = 'Please enter a valid country name';
    } else if (!/^[A-Za-z\s]+$/.test(formData.country.trim())) {
      newErrors.country = 'Country should only contain characters';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    } else if (formData.companyName.trim().length < 2) {
      newErrors.companyName = 'Company name must be at least 2 characters long';
    }

    if (!formData.enquiries.trim()) {
      newErrors.enquiries = 'Enquiries field is required';
    } else if (formData.enquiries.trim().length < 10) {
      newErrors.enquiries = 'Enquiries must be at least 10 characters long';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name } = e.target;
    const value = name === 'contactNumber' ? formatLocal(e.target.value, dial) : e.target.value;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      try {
        const payload = {
          firstName: formData.firstName,
          lastName: formData.secondName,
          cmpnyEmail: formData.companyEmail,
          contactNumber: `${dial.code} ${formData.contactNumber}`,
          country: formData.country,
          companyName: formData.companyName,
          message: formData.enquiries
        };

        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        // The body may not be JSON (e.g. a server crash page), so parse defensively.
        const data = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(data?.error || "Something went wrong. Please try again.");
        }

        console.log("✅ Form submitted successfully:", data);

        // Show success notification
        setNotification({
          open: true,
          message: 'Form submitted successfully!',
          severity: 'success'
        });

        // Reset form after submission
        setFormData({
          firstName: '',
          secondName: '',
          companyEmail: '',
          contactNumber: '',
          country: '',
          companyName: '',
          enquiries: ''
        });

      } catch (error) {
        console.error(error);

        // Show the server's message when there is one (network failures fall back
        // to a generic message).
        setNotification({
          open: true,
          message: error instanceof TypeError ? "Network error. Please check your connection and try again." : error.message,
          severity: 'error'
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
      setIsSubmitting(false);

    }
  };

  return (
    <>
      <div
        className="rounded-none shadow-lg p-8 lg:p-8 m-4 lg:m-8 overflow-x-hidden overflow-hidden"
        style={{
          // Figma 2243:3782: one flat slate tone (#47545C where it sits on white),
          // kept translucent over a blur of the hero photo like the earlier frame.
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          // No border: with a transparent 1px border the gradient tiles under it,
          // drawing a light line along the bottom edge and a dark one along the top.
          background: "rgba(25, 41, 51, 0.8)"
        }}
      >
        <div className="mb-8">
          <h2 className="text-xl lg:text-xl font-semibold text-white mb-2">
            Personal information
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name and Second Name Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-[#e5e5e5]">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="e.g. Hyra"
                className={`w-full px-4 py-3 border border-gray-200/50 rounded-none bg-gray-50 backdrop-blur-sm placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent focus:bg-white/80 transition-all duration-200 ${errors.firstName
                  ? 'border-red-300 focus:ring-red-300'
                  : 'focus:ring-blue-300'
                  }`}
              />
              {errors.firstName && (
                <p className="text-red-300 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="secondName" className="block text-sm font-medium text-[#e5e5e5]">
                Last Name *
              </label>
              <input
                type="text"
                id="secondName"
                name="secondName"
                value={formData.secondName}
                onChange={handleChange}
                placeholder="e.g. Banu"
                className={`w-full px-4 py-3 border border-gray-200/50 rounded-none bg-gray-50 backdrop-blur-sm placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent focus:bg-white/80 transition-all duration-200 ${errors.secondName
                  ? 'border-red-300 focus:ring-red-300'
                  : 'focus:ring-blue-300'
                  }`}
              />
              {errors.secondName && (
                <p className="text-red-300 text-xs mt-1">{errors.secondName}</p>
              )}
            </div>
          </div>

          {/* Company Email and Contact Number Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="companyEmail" className="block text-sm font-medium text-[#e5e5e5]">
                Company Email *
              </label>
              <input
                type="email"
                id="companyEmail"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleChange}
                placeholder="hyra@company.com"
                className={`w-full px-4 py-3 border border-gray-200/50 rounded-none bg-gray-50 backdrop-blur-sm placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent focus:bg-white/80 transition-all duration-200 ${errors.companyEmail
                  ? 'border-red-300 focus:ring-red-300'
                  : 'focus:ring-blue-300'
                  }`}
              />
              {errors.companyEmail && (
                <p className="text-red-300 text-xs mt-1">{errors.companyEmail}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="contactNumber" className="block text-sm font-medium text-[#e5e5e5]">
                Contact Number *
              </label>
              <div className="flex">
                <select
                  aria-label="Country code"
                  value={dialCode}
                  onChange={(e) => {
                    const next = dialFor(e.target.value);
                    setDialCode(next.code);
                    // Re-space (and trim) what was typed for the new country's format.
                    setFormData((prev) => ({ ...prev, contactNumber: formatLocal(prev.contactNumber, next) }));
                    if (errors.contactNumber) setErrors((prev) => ({ ...prev, contactNumber: '' }));
                  }}
                  className="shrink-0 w-[96px] px-2 py-3 border border-r-0 border-gray-200/50 rounded-none bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  {DIAL_CODES.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.code} {d.name}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder={dial.group.map((n) => 'X'.repeat(n)).join(' ')}
                  className={`flex-1 min-w-0 px-4 py-3 border border-gray-200/50 rounded-none bg-gray-50 backdrop-blur-sm placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent focus:bg-white/80 transition-all duration-200 ${errors.contactNumber
                  ? 'border-red-300 focus:ring-red-300'
                  : 'focus:ring-blue-300'
                  }`}
              />
              </div>
              {errors.contactNumber && (
                <p className="text-red-300 text-xs mt-1">{errors.contactNumber}</p>
              )}
            </div>
          </div>

          {/* Country and Company Name Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="country" className="block text-sm font-medium text-[#e5e5e5]">
                Country *
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="India"
                className={`w-full px-4 py-3 border border-gray-200/50 rounded-none bg-gray-50 backdrop-blur-sm placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent focus:bg-white/80 transition-all duration-200 ${errors.country
                  ? 'border-red-300 focus:ring-red-300'
                  : 'focus:ring-blue-300'
                  }`}
              />
              {errors.country && (
                <p className="text-red-300 text-xs mt-1">{errors.country}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="companyName" className="block text-sm font-medium text-[#e5e5e5]">
                Company Name *
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="ABC Corporation"
                className={`w-full px-4 py-3 border border-gray-200/50 rounded-none bg-gray-50 backdrop-blur-sm placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent focus:bg-white/80 transition-all duration-200 ${errors.companyName
                  ? 'border-red-300 focus:ring-red-300'
                  : 'focus:ring-blue-300'
                  }`}
              />
              {errors.companyName && (
                <p className="text-red-300 text-xs mt-1">{errors.companyName}</p>
              )}
            </div>
          </div>

          {/* Enquiries Field */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="enquiries" className="block text-sm font-medium text-[#e5e5e5]">
                Enquiries *
              </label>
              <textarea
                id="enquiries"
                name="enquiries"
                value={formData.enquiries}
                onChange={handleChange}
                rows={4}
                placeholder="Please describe your enquiry in detail..."
                className={`w-full px-4 py-3 border border-gray-200 rounded-none bg-gray-50 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-colors resize-none ${errors.enquiries
                  ? 'border-red-300 focus:ring-red-300'
                  : 'focus:ring-blue-300'
                  }`}
              />
              {errors.enquiries && (
                <p className="text-red-300 text-xs mt-1">{errors.enquiries}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center gap-2 bg-[#2D8EC5] text-white py-2 px-5 rounded-none font-medium text-sm transition duration-200 ease-in-out  ${isSubmitting
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:shadow-md transform hover:scale-105'
                }`}
            >
              {isSubmitting ? (
                <>
                  <span>Submitting</span>
                  <CircularProgress size={18} color="inherit" />
                </>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* MUI Snackbar Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ContactForm;
