# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

The security of this project is taken seriously. If you discover a security vulnerability, please follow these steps:

### 1. **Do Not** Open a Public Issue

Please **do not** create a public GitHub issue for security vulnerabilities. This could put users at risk.

### 2. Report Privately

Send a detailed report to:

**Email:** [satyasubudhi089@gmail.com](mailto:satyasubudhi089@gmail.com)

**Subject:** `[SECURITY] Brief description of the vulnerability`

### 3. Include the Following Information

To help us assess and fix the vulnerability quickly, please include:

- **Type of vulnerability** (e.g., XSS, CSRF, injection, etc.)
- **Full path** of the affected file(s)
- **Step-by-step instructions** to reproduce the issue
- **Proof of concept** or exploit code (if possible)
- **Potential impact** of the vulnerability
- **Suggested fix** (if you have one)
- **Your contact information** for follow-up questions

### Example Report Template

```markdown
**Vulnerability Type:** Cross-Site Scripting (XSS)

**Affected File(s):** 
- src/components/ContactForm.tsx

**Description:**
A detailed description of the vulnerability...

**Steps to Reproduce:**
1. Navigate to the contact form
2. Enter the following in the message field: `<script>alert('XSS')</script>`
3. Submit the form
4. The script executes

**Impact:**
This could allow attackers to...

**Suggested Fix:**
Sanitize user input using DOMPurify or similar...

**Additional Context:**
Any other relevant information...
```

## Response Timeline

We take security reports seriously and will respond according to the following timeline:

| Step | Timeline |
|------|----------|
| **Initial Response** | Within 48 hours |
| **Vulnerability Assessment** | Within 5 business days |
| **Fix Development** | Depends on severity |
| **Patch Release** | As soon as possible |
| **Public Disclosure** | After fix is deployed |

### Severity Levels

- **Critical** - Fix within 24-48 hours
- **High** - Fix within 1 week
- **Medium** - Fix within 2 weeks
- **Low** - Fix in next release

## What to Expect

After you submit a report:

1. ✅ **Acknowledgment** - We'll confirm receipt of your report
2. ✅ **Assessment** - We'll evaluate the severity and impact
3. ✅ **Updates** - We'll keep you informed of our progress
4. ✅ **Fix** - We'll develop and test a patch
5. ✅ **Release** - We'll deploy the fix and notify users
6. ✅ **Credit** - We'll acknowledge your contribution (if you wish)

## Security Best Practices for Users

### For Developers Using This Template

1. **Keep Dependencies Updated**
   ```bash
   npm audit
   npm audit fix
   npm update
   ```

2. **Environment Variables**
   - Never commit `.env` files
   - Use environment variables for sensitive data
   - Add `.env` to `.gitignore`

3. **Input Validation**
   - Validate and sanitize all user inputs
   - Use proper form validation
   - Implement CSRF protection if handling forms

4. **Content Security Policy**
   - Implement CSP headers
   - Restrict script sources
   - Use nonce or hash-based CSP

5. **HTTPS Only**
   - Always deploy with HTTPS
   - Use HSTS headers
   - Redirect HTTP to HTTPS

6. **Regular Audits**
   - Run `npm audit` regularly
   - Review dependencies periodically
   - Keep Node.js and npm updated

### Deployment Security Checklist

- [ ] All dependencies are up to date
- [ ] No sensitive data in environment variables
- [ ] HTTPS is enabled
- [ ] Content Security Policy is configured
- [ ] Input validation is implemented
- [ ] Error messages don't leak sensitive info
- [ ] Authentication tokens are stored securely
- [ ] CORS is properly configured
- [ ] Rate limiting is in place (if applicable)

## Known Security Considerations

### Client-Side Application

This is a **static portfolio website** that runs entirely in the browser:

- ✅ No server-side code
- ✅ No database connections
- ✅ No user authentication
- ✅ No sensitive data storage

### Third-Party Dependencies

We use the following major dependencies:

- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations

These are regularly updated to their latest secure versions.

### Contact Form Security

If you implement a contact form backend:

- Validate all inputs
- Implement rate limiting
- Use CAPTCHA to prevent spam
- Sanitize data before processing
- Use secure email services

## Security Updates

Security patches will be:

- Released as soon as possible
- Announced in release notes
- Tagged with `security` label
- Documented in CHANGELOG

## Bug Bounty Program

Currently, we do not offer a bug bounty program. However, we deeply appreciate security researchers who responsibly disclose vulnerabilities.

### Recognition

Contributors who report valid security vulnerabilities will be:

- Acknowledged in release notes (if desired)
- Listed in SECURITY.md (with permission)
- Thanked publicly on social media (if agreed)

## Additional Resources

### Security Tools

- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) - Check for vulnerabilities
- [Snyk](https://snyk.io/) - Continuous security monitoring
- [OWASP](https://owasp.org/) - Web security best practices

### Useful Links

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GitHub Security Advisories](https://github.com/advisories)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

## Contact

For security concerns, contact:

**Satya Subudhi**  
📧 Email: [satyasubudhi089@gmail.com](mailto:satyasubudhi089@gmail.com)  
🐙 GitHub: [@satya00089](https://github.com/satya00089)

---

**Thank you for helping keep this project secure!** 🔒
