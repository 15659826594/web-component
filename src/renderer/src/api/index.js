import { random } from '@src/components/web/utils'
import avatar1 from '@assets/img/avatar/dc68e857e74de6636d06fe168d0276dc.png'
import avatar2 from '@assets/img/avatar/78f481a6b6048b8e64f1c930830f7db8.png'

export const getProjects = function (len) {
  let data = [
    {
      id: 1,
      rank: 1,
      name: 'Allosaurus web app',
      pm: {
        name: 'Leo Gouse',
        avatar: avatar1
      },
      status: {
        type: 'success',
        text: 'On track'
      },
      update_time: '15 Mar 2021, 12:47 PM',
      resources: 3,
      start_time: '15 May 2021',
      end_time: '15 Aug 2021',
      estimation: 'US$ 10.5k'
    },
    {
      id: 2,
      rank: 2,
      name: 'MicroRaptor website',
      pm: {
        name: 'Leo Gouse',
        avatar: avatar1
      },
      status: {
        type: 'success',
        text: 'On track'
      },
      update_time: '15 Mar 2021, 12:47 PM',
      resources: 3,
      start_time: '15 May 2021',
      end_time: '15 Aug 2021',
      estimation: 'US$ 10.5k'
    },
    {
      id: 3,
      rank: 3,
      name: 'Tarius landing page',
      pm: {
        name: 'Tatiana Dias',
        avatar: avatar2
      },
      status: {
        type: 'inactive',
        text: 'On hold'
      },
      update_time: '15 Mar 2021, 12:47 PM',
      resources: undefined,
      start_time: '',
      end_time: '',
      estimation: 'US$ 10.5k'
    },
    {
      id: 4,
      rank: 4,
      name: 'Rugops App',
      pm: {
        name: 'Leo Gouse',
        avatar: avatar1
      },
      status: {
        type: 'error',
        text: 'At risk'
      },
      update_time: '15 Mar 2021, 12:47 PM',
      resources: 3,
      start_time: '15 May 2021',
      end_time: '15 Aug 2021',
      estimation: 'US$ 10.5k'
    },
    {
      id: 5,
      rank: 5,
      name: 'Erketu',
      pm: {
        name: 'Leo Gouse',
        avatar: avatar1
      },
      status: {
        type: 'success',
        text: 'On track'
      },
      update_time: '15 Mar 2021, 12:47 PM',
      resources: 3,
      start_time: '15 May 2021',
      end_time: '15 Aug 2021',
      estimation: '-'
    },
    {
      id: 6,
      rank: 6,
      name: 'Capricorn',
      pm: {
        name: 'Tatiana Dias',
        avatar: avatar2
      },
      status: {
        type: 'success',
        text: 'On track'
      },
      update_time: '15 Mar 2021, 12:47 PM',
      resources: 3,
      start_time: '15 May 2021',
      end_time: '15 Aug 2021',
      estimation: 'US$ 10.5k'
    },
    {
      id: 7,
      rank: 7,
      name: 'Sagittarius',
      pm: {
        name: 'Tatiana Dias',
        avatar: avatar2
      },
      status: {
        type: 'warning',
        text: 'Potential risk'
      },
      update_time: '15 Mar 2021, 12:47 PM',
      resources: undefined,
      start_time: '15 May 2021',
      end_time: '15 Aug 2021',
      estimation: '-'
    },
    {
      id: 8,
      rank: 8,
      name: 'Sagittarius',
      pm: {
        name: 'Roger Vaccaro',
        avatar: ''
      },
      status: {
        type: 'success',
        text: 'On track'
      },
      update_time: '15 Mar 2021, 12:47 PM',
      resources: 3,
      start_time: '15 May 2021',
      end_time: '15 Aug 2021',
      estimation: '-'
    },
    {
      id: 9,
      rank: 9,
      name: 'Pisces',
      pm: {
        name: 'Leo Gouse',
        avatar: avatar1
      },
      status: {
        type: 'success',
        text: 'On track'
      },
      update_time: '15 Mar 2021, 12:47 PM',
      resources: 3,
      start_time: '15 May 2021',
      end_time: '15 Aug 2021',
      estimation: 'US$ 10.5k'
    },
    {
      id: 10,
      rank: 10,
      name: 'Taurus',
      pm: {
        name: 'Tatiana Dias',
        avatar: avatar2
      },
      status: {
        type: 'success',
        text: 'On track'
      },
      update_time: '15 Mar 2021, 12:47 PM',
      resources: 3,
      start_time: '15 May 2021',
      end_time: '15 Aug 2021',
      estimation: 'US$ 10.5k'
    },
    {
      id: 11,
      rank: 11,
      name: 'Osiris',
      pm: {
        name: 'Leo Gouse',
        avatar: avatar1
      },
      status: {
        type: 'warning',
        text: 'Potential risk'
      },
      update_time: '15 Mar 2021, 12:47 PM',
      resources: 3,
      start_time: '15 May 2021',
      end_time: '15 Aug 2021',
      estimation: 'US$ 10.5k'
    },
    {
      id: 12,
      rank: 12,
      name: 'Horus',
      pm: {
        name: 'Leo Gouse',
        avatar: avatar1
      },
      status: {
        type: 'success',
        text: 'On track'
      },
      update_time: '15 Mar 2021, 12:47 PM',
      resources: 3,
      start_time: '15 May 2021',
      end_time: '15 Aug 2021',
      estimation: 'US$ 10.5k'
    }
  ]
  if (len) {
    data.length = len
  }
  let min = 0,
    max = 11
  for (let i = 0; i < len; i++) {
    if (!data[i]) {
      let randomNum = random(min, max)
      let obj = structuredClone(data[randomNum])
      obj.id = i
      obj.rank = i
      data[i] = obj
    }
  }
  return data
}
