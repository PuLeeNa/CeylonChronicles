import "./global.css"

export const metadata = {
    title: "Ceylon Chronicles",
    description: "Explore the rich history of Sri Lanka with Ceylon Chronicles, your AI-powered companion for historical insights and narratives.",
}

export const RootLayout = ( { children }: { children: React.ReactNode } ) => {
    return (
        <html>
            <body>{children}</body>
        </html>
    )
}