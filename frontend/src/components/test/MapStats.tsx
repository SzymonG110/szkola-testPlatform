interface Props {
    username: string
    percent: number
}

const MapStats = ({username, percent}: Props) => {

    return (
        <div>
            {username} - {percent}%
        </div>
    )

}

export default MapStats