(() => {
    const Home = () => {
        const [ac, setAc] = React.useState(localStorage.getItem('ac'))
        return (
            <div style={{height: '100%'}}>
                {
                    <LayoutMain setAc={setAc}></LayoutMain>
                }
            </div>
        )
    }
    window.Home = Home
})()