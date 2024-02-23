function EventFormContainer() {
    return (
        <div
          style={{
            width: formSize.width,
            height: formSize.height,
            background: "white",
            position: "absolute",
            overflow: "hidden",
            top: `${
              position.y + formSize.height / 2 + 50 > screenSize.height
                ? position.y - formSize.height
                : position.y - formSize.height / 2 < 100
                ? position.y
                : position.y - formSize.height / 2
            }px`,
            left: `${
              position.x + formSize.width + 10 > screenSize.width
                ? position.x - formSize.width - 50
                : position.x + 50
            }px`,
            zIndex: 999,
          }}
        >
          {openForm && <EventForm task={appointment} key={appointment?._id} />}
        </div>
    )
}

export default EventFormContainer
