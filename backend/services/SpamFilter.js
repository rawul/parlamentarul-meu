
const filter = require('spam-filter')('fisher')
const newMessages = [
  ['Buna ziua', 'good'],
  ['Dute dracu', 'bad'],
  ['Deciziile dumneavoastra nu au fost cele mai bune', 'good'],
  ['Ce credeti ca se va intampla persoanelor care nu va doresc', 'good'],
  ['Rahat', 'bad'],
  ['Ati facut o treaba excelenta', 'good'],
  ['De ce nu va faceti treaba', 'good'],
  ['Muie', 'bad'],
  ['Sper sa va schimbati atitudinea', 'good'],
  ['Te bag în pizda mã-tii', 'bad']
]

filter.empty();
newMessages.forEach(function (newMessage) {
  filter.train(newMessage[0], newMessage[1])
});
filter.setMinimum('bad', 0.65).save();

module.exports = filter;