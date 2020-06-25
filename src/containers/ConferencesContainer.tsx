import React, { FC, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { AppState } from 'store/types'
import { RouteComponentProps } from '@reach/router'
import { useDocumentTitle } from 'hooks/meta'
import { fetchConferences } from 'store/actions'
import {
  getIsFetchingConferences,
  getConferences,
  getConferencesError,
} from 'store/selectors'

type Props = RouteComponentProps & ReduxProps & {}

export const Conferences: FC<Props> = ({
  isFetchingConferences,
  fetchConferences,
  conferences,
  conferencesError,
}) => {
  useDocumentTitle('Conferences')

  useEffect(() => {
    if (!conferences.length && !conferencesError.length) {
      fetchConferences()
    }
  }, [conferences, fetchConferences, conferencesError])

  return (
    <div className="container">
      <h3 className="tc pt5">Conferences</h3>
      <p className="tc">
        Below is a summary of all conferences that MAASU has aided in hosting or
        organizing.
      </p>

      {isFetchingConferences || conferencesError ? (
        <span>loading...</span>
      ) : (
        <table className="w-100 mb4">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Conference Title</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {conferences.map((c, index) => {
              const d = new Date(c.date)
              const ye = d.getFullYear()
              const moName = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ]
              const mo = moName[d.getMonth()]

              const date = c.isApproxDate
                ? `${mo}, ${ye}`
                : `${mo} ${d.getDate()}, ${ye}`

              return (
                c.id && (
                  <tr key={index}>
                    <td>{date}</td>
                    <td>{c.type}</td>
                    <td>{c.title}</td>
                    <td>{`${c.host}, ${c.state}`}</td>
                  </tr>
                )
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  isFetchingConferences: getIsFetchingConferences(state),
  conferences: getConferences(state),
  conferencesError: getConferencesError(state),
})

const mapDispatchToProps = {
  fetchConferences,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export const ConferencesContainer = connector(Conferences)
