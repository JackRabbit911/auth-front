export const getReferer = () => (
    document.referrer === window.location.href ?
        window.location.origin :
        document.referrer
)
