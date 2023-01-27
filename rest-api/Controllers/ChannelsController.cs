using Microsoft.AspNetCore.Mvc;
using rest_api.Models;
using rest_api.Data;

namespace rest_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChannelsController : ControllerBase
    {
        [HttpGet]
        public ActionResult<Channel> GetChannels()
        {
            return Ok(ChannelsMockData.channelList);
        }

        [HttpGet("{id:int}")]
        public ActionResult<Channel> GetChannel(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            var result = ChannelsMockData.channelList.FirstOrDefault(channel => channel.Id == id);
            
            if (result == null)
            {
                return NotFound();
            }
            
            return Ok(result);
        }

        [HttpPost]
        public ActionResult<Channel> CreateChannel([FromBody]Channel _channel)
        {
            if (_channel == null)
            {
                return BadRequest();
            }

            if (_channel.Id != 0)
            {
                return BadRequest();
            }

            ChannelsMockData.channelList.Add(_channel);
            return _channel;
        }

        [HttpPut("{id:int}")]
        public IActionResult UpdateChannel(int id, [FromBody]Channel _channel) 
        {
            if (id != _channel.Id || _channel == null)
            {
                return BadRequest();
            }

            var channelToChange = ChannelsMockData.channelList.FirstOrDefault(channel => channel.Id == id);

            channelToChange.Id = _channel.Id;
            channelToChange.Users = _channel.Users;

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteChannel(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            var channelToDelete = ChannelsMockData.channelList.FirstOrDefault(channel => channel.Id == id);
            
            if (channelToDelete == null)
            {
                return NotFound();
            }

            ChannelsMockData.channelList.Remove(channelToDelete);
            
            return NoContent();
        }

    }
}