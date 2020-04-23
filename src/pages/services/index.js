import React, { useCallback, useMemo, useState } from 'react'
import { graphql,  useStaticQuery } from 'gatsby'
import { Tabs, Icon } from 'antd';
import queryString from 'query-string';

import styles from '../../components/services/styles'
import useEnchancedServices from '../../hooks/useEnchancedServices'
import { AUTOMATIC_TRANSMISSION_REPAIR } from '../../constants/specialized-keywords'
import ServicesList from '../../components/services/services-list'
import Map from '../../components/services/map'
import ContactForm from '../../components/contact-form'
import { MOBILE_DEVICE_LAYOUT_TRASHOLD } from '../../constants/layout'

import { Router, Link } from '@reach/router'

const App = () => (
  <div className="app">
    <nav className="nav">
      <Link to="services/3?query=11">Page 3</Link>
    </nav>

    <Router>
      <Page path="/services/:param" />
    </Router>
  </div>
)

const Page = props => (
  <div
    className="page"
    style={{ background: `hsl(${props.page * 75}, 60%, 60%)` }}
  >
    {props.param}
    {queryString.parse(props.location.search).query}
  </div>
)


const query = graphql`
  query {
    services {
      list {
        list {
          specialized
          specialties
          pagePath
          name
          description
          website
          points {
            address
            title
            phones
            coordinates
            workingHours {
              day
              time {
                from
                to
              }
            }
          }
          sideServicesRank {
            name
            link
            rank
            reviewsAmount
          }
          fakeReviews
          feedbackWithClientsDirection
          solveCustomerClaimsPercentage
          forumReviewsDirection
          sideForumsMentions {
            link
            textNodes {
              messages
              text
            }
          }
        }
      }
    }
  }
`

const { TabPane } = Tabs;

export default function Services() {
  const services = useStaticQuery(query).services.list.list;

  const [selectedTab, setSelectedTab] = useState('servicesList');
  const [selectedServiceId, setSelectedServiceId] = useState();
  const [contactServiceId, setContactServiceId] = useState();
  const [filterSorting, setFilterSorting] = useState({});

  const { specialized, search } = filterSorting;
  const enchancedServices = useEnchancedServices({ serviceItems: services });

  const filteredEnchancedServiceItems = enchancedServices.filter(o => {
    return o.sideServicesRank.length && (
      !specialized || o.specialized.includes(AUTOMATIC_TRANSMISSION_REPAIR)
    ) && (
      !search || o.name.toLowerCase().includes(search.toLowerCase())
    )
  })

  const selectedService = useMemo(() => filteredEnchancedServiceItems.find(o => o.pagePath === selectedServiceId), [filteredEnchancedServiceItems, selectedServiceId]);
  const contactService = useMemo(() => filteredEnchancedServiceItems.find(o => o.pagePath === contactServiceId), [filteredEnchancedServiceItems, contactServiceId]);

  const onServicePress = useCallback(({ pagePath, address }) => {
    setSelectedServiceId(`${pagePath}${address}`);
  }, []);
  const onContactServicePress = useCallback(({ pagePath }) => {
    setContactServiceId(pagePath);
  }, []);
  const onContactServiceCancel = useCallback(() => {
    setContactServiceId('');
  }, []);
  const onFilterValuesChange = useCallback((a, b, allValues) => {
    setFilterSorting(allValues)
  }, []);

  const servicesList = useMemo(() => (
    <ServicesList
      filteredEnchancedServiceItems={filteredEnchancedServiceItems}
      onFilterValuesChange={onFilterValuesChange}
      selectedServiceId={selectedServiceId}
      onListItemPress={onServicePress}
      onContactServicePress={onContactServicePress}
      setSelectedTab={setSelectedTab}
    />
  ), [filteredEnchancedServiceItems, onFilterValuesChange, selectedServiceId, onServicePress, onContactServicePress]);
  const map = useMemo(() => (
    <Map
      selectedService={selectedService}
      selectedServiceId={selectedServiceId}
      onMarkerPress={onServicePress}
      filteredEnchancedServiceItems={filteredEnchancedServiceItems}
      onContactServicePress={onContactServicePress}
    />
  ), [filteredEnchancedServiceItems, selectedServiceId, selectedService, onServicePress]);

  return (
    <div>
      <App />
      <ContactForm selectedServiceName={contactService && contactService.name} onCancel={onContactServiceCancel} />
      {
        typeof window === 'undefined' || window.innerWidth <= MOBILE_DEVICE_LAYOUT_TRASHOLD && (
          <Tabs tabPosition="bottom" size="large" activeKey={selectedTab} onChange={setSelectedTab}>
            <TabPane tab={<div><Icon type="unordered-list" />Список СТО</div>} key="servicesList">
              {servicesList}
            </TabPane>
            <TabPane tab={<div><Icon type="global" />Карта</div>} key="map">
              {map}
            </TabPane>
          </Tabs>
        )
      }
      {
        typeof window === 'undefined' || window.innerWidth > MOBILE_DEVICE_LAYOUT_TRASHOLD && (
          <div css={styles.container}>
            {servicesList}
            {map}
          </div>
        )
      }
    </div>
  )
}
